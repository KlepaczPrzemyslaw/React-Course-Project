import React, {Component, Fragment} from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.9
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    updatePurchaseState = (ingredients) => {
        const ingredientsSum = Object.values(ingredients)
            .reduce((acc, current) => acc + current, 0);
        this.setState({purchasable: (ingredientsSum > 0)})
    };

    componentDidMount() {
        axios.get('https://burgerbuilder-reactapp.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response?.data});
            })
            .catch(error => this.setState({error: true}))
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(
                `${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`
            );
        }
        queryParams.push(`price=${this.state.totalPrice}`);
        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryParams.join('&')}`
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let elementInsideModal = null;
        let burger =
            this.state.error ?
                (<div className="u-margin-top-big"><Spinner/></div>) :
                (<div className="u-margin-top-big u-text-center"><h1>Application error!</h1></div>);
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientDeleted={this.removeIngredientHandler}
                        disabledButtons={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler}
                    />
                </Fragment>
            );
            elementInsideModal = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    cancelAction={this.purchaseCancelHandler}
                    continueAction={this.purchaseContinueHandler}
                    price={this.state.totalPrice}/>
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

export default withErrorHandler(BurgerBuilder, axios);
