import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    updatePurchaseState = (ingredients) => {
        const ingredientsSum = Object.values(ingredients)
            .reduce((acc, current) => acc + current, 0);
        return ingredientsSum > 0;
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onKeepBuiltBurger();
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let elementInsideModal = null;
        let burger =
            this.props.error ?
                (<div className="u-margin-top-big u-text-center"><h1>Application error!</h1></div>) :
                (<div className="u-margin-top-big"><Spinner/></div>);
        if (this.props.ings) {
            burger = (
                <div className="burger-builder">
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientDeleted={this.props.onIngredientRemoved}
                        disabledButtons={disabledInfo}
                        price={this.props.currPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated}
                    />
                </div>
            );
            elementInsideModal = (
                <OrderSummary
                    ingredients={this.props.ings}
                    cancelAction={this.purchaseCancelHandler}
                    continueAction={this.purchaseContinueHandler}
                    price={this.props.currPrice}/>
            );
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    clickBackdrop={this.purchaseCancelHandler}>
                    {elementInsideModal}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

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
