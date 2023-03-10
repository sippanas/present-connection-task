import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, UncontrolledTooltip } from 'reactstrap';
import * as Icon from 'react-bootstrap-icons';
import APIService from '../services/api.service';

const VehicleDetails = () => {
    const { vehicleId } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState([]);
    const [vehicleLoaded, setVehicleLoaded] = useState(false);

    useEffect(() => {
        const getVehicle = (vehicleId) =>
            APIService.getSpecificVehicle(vehicleId)
                .then((response) => {
                    if (response.status === 200) {
                        setVehicle(response.data);
                        setVehicleLoaded(true);
                    }
                    else {
                        alert('Vehicle seems to not exist, returning to vehicle list');
                        navigate('/');
                    }
                });

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
                    <Icon.Calendar4Event id="DateIcon" size={24} color="black" />
                    <span>{vehicle.year}</span>
                    <UncontrolledTooltip
                        placement="left"
                        target="DateIcon">
                        Year
                    </UncontrolledTooltip>
                </div>
                <div className="d-flex justify-content-center gap-3 my-2">
                    <Icon.HeartFill id="EngineIcon" size={24} color="black" />
                    <span>{vehicle.engine}</span>
                    <UncontrolledTooltip
                        placement="left"
                        target="EngineIcon">
                        Engine
                    </UncontrolledTooltip>
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