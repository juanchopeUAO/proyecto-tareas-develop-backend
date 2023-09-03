using System.ComponentModel.DataAnnotations;

namespace Back_Proyecto.Models
{
    public class Registro
    {

        [Key]
        public int id { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}
