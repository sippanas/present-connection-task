using Microsoft.EntityFrameworkCore;
using PCTask.Data.Dtos;
using PCTask.Data.Models;
using PCTask.Extensions;

namespace PCTask.Data.Repositories
{
    public class VehiclesRepository : IVehiclesRepository
    {
        private readonly PCTaskContext _dbContext;

        public VehiclesRepository(PCTaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Retrieves an amount of records from the database based on paging parameters
        public async Task<PagedList<Vehicle>> GetMany(VehiclePagingParameters vehiclePagingParameters)
        {
            var queryable = _dbContext.Vehicles.AsQueryable();

            return await PagedList<Vehicle>.CreatePagedListAsync(queryable, vehiclePagingParameters.PageNumber,
                vehiclePagingParameters.PageSize);
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
