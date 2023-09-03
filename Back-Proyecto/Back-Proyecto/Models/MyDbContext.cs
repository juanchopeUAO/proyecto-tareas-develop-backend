using Microsoft.EntityFrameworkCore;

namespace Back_Proyecto.Models
{
    public class MyDbContext:DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext>options):base(options)
        {

        }

        public DbSet<User> User  { get; set; }
    }
}
