import VehiclesList from './components/VehiclesList';
import VehicleDetails from './components/VehicleDetails';
import CreateVehicle from './components/CreateVehicle';

const AppRoutes = [
    {
        index: true,
        element: <VehiclesList />
    },
    {
        path: '/vehicles/:vehicleId/details',
        element: <VehicleDetails />
    },
    {
        path: '/vehicles/create',
        element: <CreateVehicle />
    }
];

export default AppRoutes;
