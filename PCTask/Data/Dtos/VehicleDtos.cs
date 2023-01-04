using System.ComponentModel.DataAnnotations;

namespace PCTask.Data.Dtos
{
    public record VehicleDto(
        string? Make,
        string? Model,
        int Year,
        string? Engine);

    public record CreateVehicleDto(
        [Required] string Make, 
        [Required] string Model, 
        [Required] [Range(1500, 9999)] int Year, 
        [Required] string Engine);
}
