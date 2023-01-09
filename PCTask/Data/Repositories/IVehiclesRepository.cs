using PCTask.Data.Dtos;
using PCTask.Data.Models;
using PCTask.Extensions;

namespace PCTask.Data.Repositories
{
    public interface IVehiclesRepository
    {
        Task Create(Vehicle vehicle);
        Task<Vehicle> Get(int id);
        Task<PagedList<Vehicle>> GetMany(VehiclePagingParameters vehiclePagingParameters);
    }
}