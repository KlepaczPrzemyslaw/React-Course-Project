import React from 'react';
import PropTypes from "prop-types";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => (
            <li key={igKey}>
                <span className="u-capital-letters">
                    {igKey}:
                </span>
                <strong> {props.ingredients[igKey]} </strong> pcs
            </li>)
        );

    return (
        <div className="modal__content">
            <h2 className="u-margin-bottom-small">Your Order</h2>
            <p>A delicious burger with the following ingredients:</p>
            <ul className="u-margin-y-small u-no-list-style">
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p>Continue to checkout?</p>
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
    );
};

orderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
    cancelAction: PropTypes.func.isRequired,
    continueAction: PropTypes.func.isRequired,
};

export default orderSummary;
