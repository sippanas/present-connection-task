using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PCTask.Data.Dtos;
using PCTask.Data.Models;
using PCTask.Data.Repositories;
using System.Text.Json;
using System.Text.Json.Serialization;

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
        public async Task<IEnumerable<Vehicle>> GetManyVehicles([FromQuery] VehicleQueryParameters vehicleQueryParameters)
        {
            var vehicles = await _vehiclesRepository.GetMany(vehicleQueryParameters);

            var metadata = new
            {
                totalCount = vehicles.TotalCount,
                pageSize = vehicles.PageSize,
                currentPage = vehicles.CurrentPage,
                totalPages = vehicles.TotalPages,
                hasNext = vehicles.HasNext,
                hasPrevious = vehicles.HasPrevious
            };

            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));

            return vehicles;
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
