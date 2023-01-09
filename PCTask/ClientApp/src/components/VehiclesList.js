import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link, useSearchParams } from 'react-router-dom';
import APIService from '../services/api.service';
import * as Icon from 'react-bootstrap-icons';
import LoadingListItem from './LoadingListItem';

const VehiclesList = () => {
    const [searchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState([]);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [paginationDetails, setPaginationDetails] = useState([]); // Pagination details from 
    const [paginationParams, setPaginationParams] = useState({  // Pagination params sent from frontend
        pageSize: `${searchParams.get('pageSize') != undefined ?
            searchParams.get('pageSize') : 5}`,
        pageNumber: `${searchParams.get('pageNumber') != undefined ?
            searchParams.get('pageNumber') : 1}`,
    });

    useEffect(() => {
        const getData = () =>
            APIService.getAllVehicles(paginationParams.pageNumber, paginationParams.pageSize)
                .then((response) => {
                    if (response.status === 200) {
                        setVehicles(response.data);
                        setContentLoaded(true);
                        setPaginationDetails(response.paginationDetails);
                    }
                    else {
                        alert('A server error has occured');
                    }
                });

        getData();

    }, [paginationParams]);

    // Page navigation function
    // If 'next' is true, next page is selected
    // If 'next' is false, previous page is selected
    const SelectPage = (next) => {
        const params = {
            pageNumber: next ? (paginationDetails.currentPage + 1) : (paginationDetails.currentPage - 1),
            pageSize: paginationDetails.pageSize
        };

        setPaginationParams(params);
    };

    return (
        <div className="list-group w-auto my-4">
            <h1 className="d-flex justify-content-center">Vehicles</h1>
            <hr />
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
            {vehicles.map((v, i) => {
                return (
                    <Link key={i} to={`/vehicles/${v.id}/details`} path="relative"
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
                [...Array(3)].map((_, i) => {
                    return <LoadingListItem key={i} />;
                })}

            <hr />
            <div className="d-flex justify-content-center my-2">
                <ButtonGroup size="sm">
                    <Button onClick={() => SelectPage(false)} disabled={!paginationDetails.hasPrevious}>
                        {'<'}
                    </Button>
                    <Button disabled outline>
                        {paginationDetails.currentPage}
                    </Button>
                    <Button onClick={() => SelectPage(true)} disabled={!paginationDetails.hasNext}>
                        {'>'}
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default VehiclesList;