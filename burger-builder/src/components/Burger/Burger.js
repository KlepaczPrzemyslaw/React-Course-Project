import React from 'react';
import BurgerIngredient from './BurgerIngedient/BurgerIngedient';
import PropTypes from "prop-types";

const burger = (props) => {

    let burgerIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) =>
            <BurgerIngredient type={igKey} key={igKey + i}/>
        )
    }).flat();

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className="u-margin-top-toolbar">
            <div className="burger">
                <div className="burger__image">
                    <BurgerIngredient type="bread-top"/>
                    {burgerIngredients}
                    <BurgerIngredient type="bread-bottom"/>
                </div>
            </div>
        </div>
    );
};

burger.propTypes = {
    ingredients: PropTypes.object.isRequired
};

export default burger;
