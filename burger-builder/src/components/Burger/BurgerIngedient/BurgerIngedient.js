import React from 'react';
import PropTypes from 'prop-types';

const BurgerIngredient = props => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className="ig__bread-bottom"></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className="ig__bread-top">
                    <div className="ig__seeds1"></div>
                    <div className="ig__seeds2"></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className="ig__meat"></div>;
            break;
        case ('cheese'):
            ingredient = <div className="ig__cheese"></div>;
            break;
        case ('salad'):
            ingredient = <div className="ig__salad"></div>;
            break;
        case ('bacon'):
            ingredient = <div className="ig__bacon"></div>;
            break;
        default:
            console.error('Ingredient with wrong type!');
    }

    return ingredient;
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
