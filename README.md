# Present Connection Full-stack internship task
## Before running the project
The project uses a MSSQL database to store its data. Before running it, the connection string located in ```appsettings.json``` must be modified by changing the database name. Or just simply create a database with the current name (```pctask-db```) and you're good to go.
Migrations are applied during runtime.

## Running the project
You can open the solution file in **Visual Studio** or by navigating to ```PCTask/``` and excecuting **```dotnet watch run```** in your preferred CLI. Both back-end and front-end apps will be launched.

&nbsp;
## Task
*The task required to create an API using **C#** and a front-end for it by using **React***

My implementation retrieves and stores vehicle data (Make, Model, Year, Engine)

Extra tasks:
- [x] Pagination
- [ ] Filtering
- [x] Sorting

&nbsp;
## API endpoints
### Retrieve an amount of vehicle records based on parameters (orderByField and orderByAsc are optional)
```http
GET https://localhost:7004/api/vehicles?pageNumber={x}&pageSize={y}
GET https://localhost:7004/api/vehicles?pageNumber={x}&pageSize={y}&orderByField=Make&orderByAsc=true
```
### Retrieve a specific vehicle record based on ID
```http
GET https://localhost:7004/api/vehicles/{id}
```
### Create a new vehicle record
```http
POST https://localhost:7004/api/vehicles
```
JSON body for creating a new record:
```json
{
    "make": "Volkswagen",
    "model": "Golf",
    "year": 2005,
    "engine": "1.6FSI"
}
```
