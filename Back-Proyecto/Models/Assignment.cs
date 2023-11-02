using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_Proyecto.Models
{
    public class Assignment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [Required]
        public string title { get; set; }
        public string state { get; set; } = "En proceso";
        [Required]
        public string description { get; set;}
        [Required]
        public string priority { get; set; }

        public int userid { get; set; }
        public Users? User { get; set; }
    }
}
