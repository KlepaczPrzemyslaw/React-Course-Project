import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        const ingredientsSum = Object.values(ingredients)
            .reduce((acc, current) => acc + current, 0);
        return ingredientsSum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onKeepBuiltBurger();
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    // Render

    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let elementInsideModal = null;
    let burger =
        props.error ?
            (<div className="u-margin-top-big u-text-center"><h1>Application error!</h1></div>) :
            (<div className="u-margin-top-big"><Spinner/></div>);
    if (props.ings) {
        burger = (
            <div className="burger-builder">
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientDeleted={props.onIngredientRemoved}
                    disabledButtons={disabledInfo}
                    price={props.currPrice}
                    purchasable={updatePurchaseState(props.ings)}
                    purchasing={purchaseHandler}
                    isAuthenticated={props.isAuthenticated}
                />
            </div>
        );
        elementInsideModal = (
            <OrderSummary
                ingredients={props.ings}
                cancelAction={purchaseCancelHandler}
                continueAction={purchaseContinueHandler}
                price={props.currPrice}/>
        );
    }

    return (
        <Fragment>
            <Modal
                show={purchasing}
                clickBackdrop={purchaseCancelHandler}>
                {elementInsideModal}
            </Modal>
            {burger}
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        currPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onKeepBuiltBurger: () => dispatch(actionTypes.keepBuiltBurger())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
