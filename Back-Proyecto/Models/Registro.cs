using System.ComponentModel.DataAnnotations;

namespace Back_Proyecto.Models
{
    public class Registro
    {
        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
