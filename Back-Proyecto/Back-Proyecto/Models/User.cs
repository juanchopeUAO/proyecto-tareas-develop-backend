using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_Proyecto.Models
{
    [Table("User")]
    public class User
    {
        
        [Key]
        public  int id { get; set; } 

        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }
    }
}

