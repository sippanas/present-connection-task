import axios from 'axios';

const getAllVehicles = async () => {
    return await axios.get('api/vehicles')
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((e) => {
            return e.response.status;
        });
};

const getSpecificVehicle = async (id) => {
    return await axios.get('api/vehicles/' + id)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((e) => {
            return e.response.status;
        });
};

const createVehicle = async (make, model, year, engine) => {
    return await axios.post('api/vehicles', { make, model, year, engine })
        .then((response) => {
            if (response.status === 201) {
                return true;
            }
        })
        .catch(() => {
            return false;
        });
};

const APIService = {
    getAllVehicles,
    getSpecificVehicle,
    createVehicle
};

export default APIService;