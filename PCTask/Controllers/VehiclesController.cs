using Microsoft.AspNetCore.Mvc;
using PCTask.Data.Models;

namespace PCTask.Controllers
{
    [ApiController]
    [Route("api/vehicles")]
    public class VehiclesController : ControllerBase
    {
        // GET: /api/vehicles
        // Returns all vehicles
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetAllVehicles()
        {
            var vehicles = new List<Vehicle>
            { 
                new Vehicle { Make = "Volkswagen", Model = "Golf", Year = 2004, Engine = "1.9TDI" },
                new Vehicle { Make = "Volkswagen", Model = "Golf", Year = 2008, Engine = "2.0TDI" }
            };

            return vehicles;
        }

        // GET: /api/vehicles/1
        // Returns specific vehicle based on ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = new Vehicle { Make = "Audi", Model = "A4", Year = 2000, Engine = "2.5TDI" };

            return Ok(vehicle);
        }

        // POST: /api/vehicles
        // Creates a new vehicle
        [HttpPost]
        public async Task<ActionResult<Vehicle>> CreateVehicle()
        {
            var vehicle = new Vehicle { Make = "Audi", Model = "A6", Year = 2012, Engine = "3.0TDI" };

            return Created($"/api/vehicles/1", 1);
        }
    }
}
