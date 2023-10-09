using Back_Proyecto.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;



public class AuthenticationService 
{
    private readonly MyDbContext _myDbContext;
    private readonly IConfiguration _configuration;

    public AuthenticationService(MyDbContext myDbContext, IConfiguration configuration)
    {
        _myDbContext = myDbContext;
        _configuration = configuration;
    }
    public dynamic Authenticate(string email, string password)
    {
        Users user = _myDbContext.Users .FirstOrDefault(x => x.email == email);

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
                new Claim("id", user.id.ToString()),  // Aquí se incluye la reclamación "id"
                new Claim("email", user.email),
            };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                jwt.Issuer,
                jwt.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signIn
            );
            return new
            {
                success = true,
                message = "exito",
                result = new JwtSecurityTokenHandler().WriteToken(token),
                userId = user.id,
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
}
