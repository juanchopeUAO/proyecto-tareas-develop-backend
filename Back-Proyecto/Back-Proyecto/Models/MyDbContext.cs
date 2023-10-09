using Microsoft.EntityFrameworkCore;

namespace Back_Proyecto.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Assignment> Assignment { get; set; }
    }
}
