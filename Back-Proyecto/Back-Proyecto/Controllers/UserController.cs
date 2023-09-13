using Microsoft.AspNetCore.Mvc;
using Back_Proyecto.Models;


[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly AuthenticationService _authenticationService;
    private readonly RegistrationService _registrationService;

    public UserController(AuthenticationService authenticationService, RegistrationService registrationService)
    {
        _authenticationService = authenticationService;
        _registrationService = registrationService;
    }
    [HttpPost]
    [Route("login")]
    public IActionResult IniciarSesion([FromBody] User request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _authenticationService.Authenticate(request.email, request.password);

            
            return Ok(new
            {
                result.success,
                result.message,
                result.result
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = "Ocurrió un error durante la autenticación.",
                result = ex.Message
            });
        }
    }



}


