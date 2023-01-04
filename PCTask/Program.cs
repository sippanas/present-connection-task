using Microsoft.EntityFrameworkCore;
using PCTask.Data;
using PCTask.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<PCTaskContext>();
builder.Services.AddTransient<IVehiclesRepository, VehiclesRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.MapFallbackToFile("index.html");

// Apply existing migrations
var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<PCTaskContext>();
dbContext.Database.Migrate();

app.Run();
