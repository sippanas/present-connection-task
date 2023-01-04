﻿using Microsoft.AspNetCore.Mvc;
using PCTask.Data.Dtos;
using PCTask.Data.Models;
using PCTask.Data.Repositories;

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

        // GET: /api/vehicles
        // Returns all vehicles
        [HttpGet]
        public async Task<IEnumerable<Vehicle>> GetAllVehicles()
        {
            var vehicles = await _vehiclesRepository.GetAll();

            IEnumerable<VehicleDto> vehiclesDto =
                vehicles.Select(x => new VehicleDto(x.Make, x.Model, x.Year, x.Engine));

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