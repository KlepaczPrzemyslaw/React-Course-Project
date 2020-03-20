import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    updatePurchaseState = (ingredients) => {
        const ingredientsSum = Object.values(ingredients)
            .reduce((acc, current) => acc + current, 0);
        return ingredientsSum > 0;
    };

    componentDidMount() {
        /*axios.get('https://burgerbuilder-reactapp.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response?.data});
            })
            .catch(error => this.setState({error: true}))*/
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
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
            this.state.error ?
                (<div className="u-margin-top-big"><Spinner/></div>) :
                (<div className="u-margin-top-big u-text-center"><h1>Application error!</h1></div>);
        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientDeleted={this.props.onIngredientRemoved}
                        disabledButtons={disabledInfo}
                        price={this.props.currPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                    />
                </Fragment>
            );
            elementInsideModal = (
                <OrderSummary
                    ingredients={this.props.ings}
                    cancelAction={this.purchaseCancelHandler}
                    continueAction={this.purchaseContinueHandler}
                    price={this.props.currPrice}/>
            );
        }
        if (this.state.loading) {
            elementInsideModal = <Spinner/>;
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    clickBackdrop={this.purchaseCancelHandler}
                    loading={this.state.loading}>
                    {elementInsideModal}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        currPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
