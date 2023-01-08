import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import validator from 'validator';
import APIService from '../services/api.service';

const CreateVehicle = () => {
    const navigate = useNavigate();
    const formValid = useRef(false);
    const addingNew = useRef(false);

    const [formValues, setFormValues] = useState({
        make: '',
        model: '',
        year: '',
        engine: ''
    });

    const [formErrors, setFormErrors] = useState({
        make: 'Field is required',
        model: 'Field is required',
        year: 'Field is required',
        engine: 'Field is required'
    });


    const onSubmit = (e) => {
        e.preventDefault();
        addingNew.current = true;

        APIService.createVehicle(formValues.make, formValues.model, formValues.year, formValues.engine)
            .then((created) => {
                if (created === true) {
                    navigate('/');
                }
                else {
                    alert('A server error has occured');
                }
            });

        addingNew.current = false;
    };

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        const validateForm = () => {
            let errors = formErrors;

            if (validator.isEmpty(formValues.make)) {
                errors.make = 'Field is required';
            }
            else errors.make = '';

            if (validator.isEmpty(formValues.model)) {
                errors.model = 'Field is required';
            }
            else errors.model = '';

            if (validator.isEmpty(formValues.year) || !validator.isNumeric(formValues.year) ||
                (formValues.year < 1500 || formValues.year > 9999)) {
                errors.year = 'Field is invalid (Year should be between 1500-9999)';
            }
            else errors.year = '';

            if (validator.isEmpty(formValues.engine)) {
                errors.engine = 'Field is required';
            }
            else errors.engine = '';

            setFormErrors({ ...errors });

            // If there are no validation errors in fields, set form as valid
            formValid.current = validator.isEmpty(formErrors.make) && 
                validator.isEmpty(formErrors.model) &&
                validator.isEmpty(formErrors.year) &&
                validator.isEmpty(formErrors.engine)
        };

        validateForm();

    }, [formValues]);

    return (
        <div className="mx-auto px-5">
            <h1>Add new vehicle</h1>
            <hr/>
            <form onSubmit={onSubmit} noValidate>
                <div className="mb-3 fw-bold">
                    <label htmlFor="makeInput" className="form-label">Make</label>
                    <input name="make" type="text" id="makeInput" maxLength={50}
                        className={`form-control ${formErrors.make.length > 0 ? 'is-invalid' : 'is-valid'}`}
                        aria-describedby="makeInputFeedback"
                        onChange={(e) => handleUserInput(e)} />
                    <div id="makeInputFeedback" className="invalid-feedback">
                        {formErrors.make}
                    </div>
                </div>
                <div className="mb-3 fw-bold">
                    <label htmlFor="modelInput" className="form-label">Model</label>
                    <input name="model" type="text" id="modelInput" maxLength={50}
                        className={`form-control ${formErrors.model.length > 0 ? 'is-invalid' : 'is-valid'}`}
                        aria-describedby="modelInputFeedback"
                        onChange={(e) => handleUserInput(e)} />
                    <div id="modelInputFeedback" className="invalid-feedback">
                        {formErrors.model}
                    </div>
                </div>
                <div className="mb-3 fw-bold">
                    <label htmlFor="yearInput" className="form-label">Year</label>
                    <input name="year" type="text" id="yearInput" maxLength={4}
                        className={`form-control ${formErrors.year.length > 0 ? 'is-invalid' : 'is-valid'}`}
                        aria-describedby="yearInputFeedback"
                        onChange={(e) => handleUserInput(e)} />
                    <div id="yearInputFeedback" className="invalid-feedback">
                        {formErrors.year}
                    </div>
                </div>
                <div className="mb-3 fw-bold">
                    <label htmlFor="engineInput" className="form-label">Engine</label>
                    <input name="engine" type="text" id="engineInput" maxLength={50}
                        className={`form-control ${formErrors.engine.length > 0 ? 'is-invalid' : 'is-valid'}`}
                        aria-describedby="engineInputFeedback"
                        onChange={(e) => handleUserInput(e)} />
                    <div id="engineInputFeedback" className="invalid-feedback">
                        {formErrors.engine}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"
                    disabled={!formValid.current}>
                    {addingNew.current && <Spinner size="sm">Adding...</Spinner>}
                    {!addingNew.current && <span>Add</span>}
                </button>
            </form>
        </div>
    );
};

export default CreateVehicle;