using Microsoft.EntityFrameworkCore;
using PCTask.Data.Models;

namespace PCTask.Data
{
    public class PCTaskContext : DbContext
    { 
        public DbSet<Vehicle> Vehicles { get; set; }

        private readonly IConfiguration _configuration;

        public PCTaskContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("MSSQLConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
