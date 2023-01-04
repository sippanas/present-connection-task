using PCTask.Data.Models;

namespace PCTask.Data.Repositories
{
    public interface IVehiclesRepository
    {
        Task Create(Vehicle vehicle);
        Task<Vehicle> Get(int id);
        Task<IEnumerable<Vehicle>> GetAll();
    }
}