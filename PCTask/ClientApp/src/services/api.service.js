import axios from 'axios';

// Retrieves an amount of vehicle records from the API based on paging parameters
// Returns: response status code, data, pagination header
// 200 OK - vehicle record list
const getAllVehicles = async (pageNumber, pageSize, orderByField, orderByAsc) => {
    return await axios
        .get(`api/vehicles?pageNumber=${pageNumber}&pageSize=${pageSize}&orderByField=${orderByField}&orderByAsc=${orderByAsc}`)
        .then((response) => {
            if (response.status === 200) {
                return {
                    status: response.status,
                    data: response.data,
                    paginationDetails: JSON.parse(response.headers.pagination)
                };
            }
        })
        .catch((e) => {
            return { status: e.response.status, data: [] };
        });
};

// Retrieves specific vehicle record from the API
// Returns: response status code and data
// 200 OK - vehicle is found
const getSpecificVehicle = async (id) => {
    return await axios.get('api/vehicles/' + id)
        .then((response) => {
            if (response.status === 200) {
                return { status: response.status, data: response.data };
            }
        })
        .catch((e) => {
            return { status: e.response.status, data: [] };
        });
};

// Creates a new vehicle in the API
// Returns: response status code 
// 201 Created - vehicle is created
const createVehicle = async (make, model, year, engine) => {
    return await axios.post('api/vehicles', { make, model, year, engine })
        .then((response) => {
            if (response.status === 201) {
                return { status: response.status };
            }
        })
        .catch((e) => {
            return { status: e.response.status };
        });
};

const APIService = {
    getAllVehicles,
    getSpecificVehicle,
    createVehicle
};

export default APIService;