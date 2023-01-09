using Microsoft.AspNetCore.Mvc;
using PCTask.Data.Dtos;
using PCTask.Data.Models;
using PCTask.Data.Repositories;
using System.Text.Json;

namespace PCTask.Controllers
{
    [ApiController]
    [Route("api/vehicles")]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehiclesRepository _vehiclesRepository;

        public VehiclesController(IVehiclesRepository vehiclesRepository)
        {
            _vehiclesRepository = vehiclesRepository;
        }

        // GET: /api/vehicles?pageNumber=x&pageSize=y
        // Returns an amount of vehicles based on paging parameters
        [HttpGet]
        public async Task<IEnumerable<VehicleDto>> GetManyVehicles([FromQuery] VehiclePagingParameters vehiclePagingParameters)
        {
            var vehicles = await _vehiclesRepository.GetMany(vehiclePagingParameters);

            var metadata = new
            {
                vehicles.TotalCount,
                vehicles.PageSize,
                vehicles.CurrentPage,
                vehicles.TotalPages,
                vehicles.HasNext,
                vehicles.HasPrevious
            };

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(metadata));

            return vehicles.Select(x => new VehicleDto(x.Make, x.Model, x.Year, x.Engine));
        }

        // GET: /api/vehicles/1
        // Returns specific vehicle based on ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = await _vehiclesRepository.Get(id);
            if (vehicle == null) return NotFound();

            return Ok(vehicle);
        }

        // POST: /api/vehicles
        // Creates a new vehicle
        [HttpPost]
        public async Task<ActionResult<Vehicle>> CreateVehicle(CreateVehicleDto vehicleDto)
        {
            var newVehicle = new Vehicle
            {
                Make = vehicleDto.Make,
                Model = vehicleDto.Model,
                Year = vehicleDto.Year,
                Engine = vehicleDto.Engine
            };

            await _vehiclesRepository.Create(newVehicle);

            return Created($"/api/vehicles/{newVehicle.Id}", newVehicle);
        }
    }
}
