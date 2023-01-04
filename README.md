# Present Connection Full-stack internship task
## Before running the project
The project uses a MSSQL database to store its data. Before running it, the connection string located in ```appsettings.json``` must be modified by changing the database name. Or just simply create a database with the current name (```pctask-db```) and you're good to go.
Migrations are applied during runtime.

&nbsp;
## Task
*The task required to create an API using **C#** and a front-end for it by using **React***

My implementation retrieves and stores vehicle data (Make, Model, Year, Engine)

&nbsp;
## API endpoints
### Retrieve all vehicle records
```http
GET https://localhost:7004/api/vehicles
```
### Retrieve a specific vehicle record based on ID
```http
GET https://localhost:7004/api/vehicles/[id]
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
