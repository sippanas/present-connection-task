using Microsoft.EntityFrameworkCore;
using PCTask.Data.Models;

namespace PCTask.Data.Repositories
{
    public class VehiclesRepository : IVehiclesRepository
    {
        private readonly PCTaskContext _dbContext;

        public VehiclesRepository(PCTaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Retrieves all the records from the database
        public async Task<IEnumerable<Vehicle>> GetAll()
        {
            return await _dbContext.Vehicles.ToListAsync();
        }

        // Retrieves a specific record from the database 
        public async Task<Vehicle> Get(int id)
        {
            return await _dbContext.Vehicles.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        // Creates a new record in the database
        public async Task Create(Vehicle vehicle)
        {
            _dbContext.Vehicles.Add(vehicle);
            await _dbContext.SaveChangesAsync();
        }
    }
}
