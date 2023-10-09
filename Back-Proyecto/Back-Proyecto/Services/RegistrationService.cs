using Back_Proyecto.Models;
using System;
using System.Linq;
using System.Threading.Tasks;



public class RegistrationService 
{
    private readonly MyDbContext _myDbContext;

    public RegistrationService(MyDbContext myDbContext)
    {
        _myDbContext = myDbContext;
    }

    public async Task<RegistrationResult> Register(Registro registro)
    {
        try
        {
            if (_myDbContext.Users.Any(x => x.email == registro.email))
            {
                return new RegistrationResult
                {
                    Success = false,
                    Message = "El correo electrónico ya está en uso.",
                    Result = ""
                };
            }

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(registro.password);

            var nuevoUsuario = new Users
            {
                email = registro.email,
                password = hashedPassword
            };

            _myDbContext.Users.Add(nuevoUsuario);
            await _myDbContext.SaveChangesAsync();

            return new RegistrationResult
            {
                Success = true,
                Message = "Usuario registrado exitosamente.",
                Result = ""
            };
        }
        catch (Exception ex)
        {
            return new RegistrationResult
            {
                Success = false,
                Message = "Ocurrió un error durante el registro.",
                Result = ex.Message
            };
        }
    }
}




