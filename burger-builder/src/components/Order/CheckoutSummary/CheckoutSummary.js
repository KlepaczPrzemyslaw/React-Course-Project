import React from 'react';

import Burger from '../../Burger/Burger';
import PropTypes from "prop-types";

const CheckoutSummary = (props) => {
    return (
        <div className="checkout-summary">
            <div>
                <h1 className="checkout-summary__header">
                    We hope it tastes well!
                </h1>
                <div style={{margin: 'auto'}}>
                    <Burger ingredients={props.ingredients}/>
                </div>
                <button
                    className="btn btn--danger"
                    onClick={props.cancelAction}>
                    Cancel
                </button>
                <button
                    className="btn btn--success"
                    onClick={props.continueAction}>
                    Continue
                </button>
            </div>
        </div>
    );
};

CheckoutSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    cancelAction: PropTypes.func.isRequired,
    continueAction: PropTypes.func.isRequired,
};

export default CheckoutSummary;
