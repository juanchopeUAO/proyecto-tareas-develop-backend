using Back_Proyecto.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Back_Proyecto.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _myDbContext;
        private readonly IConfiguration _configuration;

        public UserController(MyDbContext myDbContext, IConfiguration configuration)
        {
            _myDbContext = myDbContext;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public dynamic IniciarSesion([FromBody] object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());

            string email = data.email.ToString();
            string password = data.password.ToString();

            User user = _myDbContext.User.FirstOrDefault(x => x.email == email);

            if (user == null)
            {
                return new
                {
                    success = false,
                    message = "Credenciales son incorrectas",
                    result = ""
                };
            }

            if (BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

                var claims = new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            new Claim("id", user.id.ToString()), // Cambiado a minúsculas
            new Claim("email", user.email), // Cambiado a minúsculas
        };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                     jwt.Issuer,
                     jwt.Audience,
                     claims,
                     expires: DateTime.Now.AddMinutes(4),
                     signingCredentials: signIn
                );
                return new
                {
                    success = true,
                    message = "exito",
                    result = new JwtSecurityTokenHandler().WriteToken(token)
                };
            }
            else
            {
                return new
                {
                    success = false,
                    message = "Credenciales son incorrectas",
                    result = ""
                };
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Registrar([FromBody] Registro registro)
        {
            try
            {
               
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (_myDbContext.User.Any(x => x.email == registro.email))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "El correo electrónico ya está en uso.",
                        result = ""
                    });
                }

           
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(registro.password);

             
                var nuevoUsuario = new User
                {
                    email = registro.email,
                    password = hashedPassword 
                };

                _myDbContext.User.Add(nuevoUsuario);
                await _myDbContext.SaveChangesAsync();

              
                return Ok(new
                {
                    success = true,
                    message = "Usuario registrado exitosamente.",
                    result = ""
                });
            }
            catch (Exception ex)
            {
              

                return StatusCode(500, new
                {
                    success = false,
                    message = "Ocurrió un error durante el registro.",
                    result = ex.Message
                });
            }

        }

    }
}
