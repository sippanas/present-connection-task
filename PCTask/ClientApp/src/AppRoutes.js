import VehiclesList from './components/VehiclesList';
import VehicleDetails from './components/VehicleDetails';

const AppRoutes = [
    {
        index: true,
        element: <VehiclesList />
    },
    {
        path: '/vehicles/:vehicleId/details',
        element: <VehicleDetails />
    }
];

export default AppRoutes;
