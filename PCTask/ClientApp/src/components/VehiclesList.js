import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIService from '../services/api.service';
import * as Icon from 'react-bootstrap-icons';
import LoadingListItem from './LoadingListItem';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        const getData = () =>
            APIService.getAllVehicles()
                .then((response) => {
                    if (response.status === 200) {
                        setVehicles(response.data);
                        setContentLoaded(true);
                    }
                    else {
                        alert('A server error has occured');
                    }
                });

        getData();

    }, []);

    return (
        <div className="list-group w-auto my-4">
            <h1 className="d-flex justify-content-center">Vehicles</h1>
            <hr/>
            <Link to="/vehicles/create" path="relative"
                className="list-group-item list-group-item-primary d-flex gap-3 py-3"
                aria-current="true">
                <Icon.CarFrontFill size={32} color="black" />
                <div className="d-flex gap-1 w-100 justify-content-between">
                    <div className="my-auto mx-auto">
                        <h6>Add new vehicle</h6>
                    </div>
                </div>
            </Link>
            {vehicles.map((v) => {
                return (
                    <Link key={v.id} to={`/vehicles/${v.id}/details`} path="relative"
                        className="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true">
                        <Icon.CarFrontFill size={32} color="black" />
                        <div className="d-flex gap-1 w-100 justify-content-between">
                            <div className="my-auto mx-auto">
                                <h6>{v.make} {v.model}</h6>
                            </div>
                        </div>
                    </Link>
                );
            })}

            {!contentLoaded &&
                [...Array(3)].map((item, i) => {
                    return <LoadingListItem key={i} />;
                })}
        </div>
    );
};

export default VehiclesList;