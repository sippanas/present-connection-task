import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIService from '../services/api.service';
import * as Icon from 'react-bootstrap-icons';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const getData = () =>
            APIService.getAllVehicles()
                .then((data) => setVehicles(data))
                .catch(() => {
                    alert('A server error has occured');
                });

        getData();

    }, []);

    return (
        <div className="list-group w-auto my-4">
            <h1>Vehicles</h1>
            <Link to="/" path="relative"
                className="list-group-item list-group-item-primary d-flex gap-3 py-3"
                aria-current="true">
                <Icon.CarFrontFill size={32} color="black" />
                <div className="d-flex gap-1 w-100 justify-content-between">
                    <div className="my-auto mx-auto">
                        <h6>Create new vehicle</h6>
                    </div>
                </div>
            </Link>
            {vehicles.map((v) => {
                return (
                    <Link to="/" path="relative"
                        key={v.id}
                        className="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true">
                        <Icon.CarFrontFill size={32} color="black" />
                        <div className="d-flex gap-1 w-100 justify-content-between">
                            <div className="my-auto mx-auto">
                                <h6>{v.make} {v.model}</h6>
                            </div>
                        </div>
                    </Link>
                    )
            })}
        </div>
    );
};

export default VehiclesList;