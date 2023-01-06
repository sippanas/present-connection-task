import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import VehiclesList from "./components/VehiclesList";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/vehicles',
        element: <VehiclesList />
    }
];

export default AppRoutes;
