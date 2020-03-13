import React from 'react';
import BurgerIngredient from './BurgerIngedient/BurgerIngedient';

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
        <div className="burger">
            <BurgerIngredient type="bread-top"/>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
