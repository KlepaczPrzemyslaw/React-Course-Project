import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from "prop-types";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];

const buildControls = (props) => (
    <div className="build-controls">
        <p className="build-controls__price">
            Current Price:
            <strong className="u-margin-left-small">
                {props.price.toFixed(2)}$
            </strong>
        </p>
        {
            controls.map(ctrl => (
                <BuildControl
                    label={ctrl.label}
                    key={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    deleted={() => props.ingredientDeleted(ctrl.type)}
                    disabled={props.disabledButtons[ctrl.type]}
                />
            ))
        }
        <button
            className="build-controls__order-button"
            disabled={!props.purchasable}
            onClick={props.purchasing}>
            Order Now
        </button>
    </div>
);

buildControls.propTypes = {
    ingredientAdded: PropTypes.func.isRequired,
    ingredientDeleted: PropTypes.func.isRequired,
    disabledButtons: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
    purchasable: PropTypes.bool.isRequired,
    purchasing: PropTypes.func.isRequired,
};

export default buildControls;
