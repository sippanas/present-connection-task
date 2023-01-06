import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import * as Icon from 'react-bootstrap-icons';
import APIService from '../services/api.service';

const VehicleDetails = () => {
    const { vehicleId } = useParams();
    const [vehicle, setVehicle] = useState([]);
    const [vehicleLoaded, setVehicleLoaded] = useState(false);

    useEffect(() => {
        const getVehicle = (vehicleId) =>
            APIService.getSpecificVehicle(vehicleId)
                .then((data) => {
                    setVehicle(data);
                    setVehicleLoaded(true);
                })
                .catch(() => alert('A server error has occured'));

        getVehicle(vehicleId);

    }, []);

    const DetailsBody = () => (
        <div className="p-2 mb-3 bg-gray text-dark rounded-3 border">
            <div className="text-center container-fluid py-5">
                <div className="d-flex justify-content-center gap-3">
                    <Icon.CarFrontFill size={64} color="black" />
                    <h1 className="display-5 fw-bold">{vehicle.make} {vehicle.model}</h1>
                </div>
                <hr />
                <div className="d-flex justify-content-center gap-3 my-3">
                    <Icon.Calendar4Event size={24} color="black" />
                    <span>{vehicle.year}</span>
                </div>
                <div className="d-flex justify-content-center gap-3 my-2">
                    <Icon.HeartFill size={24} color="black" />
                    <span>{vehicle.engine}</span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {!vehicleLoaded && <div className="text-center">
                <Spinner color="primary"
                    className="m-5"
                    style={{ height: '4rem', width: '4rem' }}>Loading...</Spinner>
            </div>}

            {vehicleLoaded && <DetailsBody />}
        </>
    );
};

export default VehicleDetails;