import React, { useState, useEffect } from 'react';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormGroup,
    Input,
    Label
} from 'reactstrap';
import { Link, useSearchParams } from 'react-router-dom';
import APIService from '../services/api.service';
import * as Icon from 'react-bootstrap-icons';
import LoadingListItem from './LoadingListItem';

const VehiclesList = () => {
    const [searchParams] = useSearchParams();
    const [vehicles, setVehicles] = useState([]);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [orderingDropdownOpen, setDropdownOpen] = useState(false);
    const [paginationDetails, setPaginationDetails] = useState([]); // Pagination details from 
    const [paginationParams, setPaginationParams] = useState({  // Pagination params sent from frontend
        pageSize: `${searchParams.get('pageSize') != undefined ?
            searchParams.get('pageSize') : 5}`,
        pageNumber: `${searchParams.get('pageNumber') != undefined ?
            searchParams.get('pageNumber') : 1}`,
    });
    const orderingFields = ["Make", "Model", "Year", "Engine"];
    const [currentOrderField, setCurrentOrderField] = useState(orderingFields[0]);
    const [orderingSwitch, setOrderingSwitch] = useState(true);

    useEffect(() => {
        const getData = () =>
            APIService
                .getAllVehicles(paginationParams.pageNumber, paginationParams.pageSize, currentOrderField, orderingSwitch)
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

    }, [paginationParams, currentOrderField, orderingSwitch]);

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

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const onOrderingDropdownClicked = (value) => {
        setCurrentOrderField(value);
    };

    return (
        <div className="list-group w-auto my-4">
            <h1 className="d-flex justify-content-center">Vehicles</h1>
            <hr />
            <div className="d-flex justify-content-center align-items-center my-2 gap-3">
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
                <Dropdown isOpen={orderingDropdownOpen} toggle={toggle} direction="down">
                    <DropdownToggle caret>Order by</DropdownToggle>
                    <DropdownMenu className="dropdown-scroll">
                        {orderingFields.map((value) => {
                            return <DropdownItem key={value} onClick={() => onOrderingDropdownClicked(value)}>{value}</DropdownItem>
                        })}
                    </DropdownMenu>
                </Dropdown>
                <FormGroup switch>
                    <Input
                        type="switch"
                        checked={orderingSwitch}
                        onChange={() => {
                            setOrderingSwitch(!orderingSwitch)
                        }}
                    />
                    <Label check>Ascending ordering</Label>
                </FormGroup>
            </div>
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
        </div>
    );
};

export default VehiclesList;