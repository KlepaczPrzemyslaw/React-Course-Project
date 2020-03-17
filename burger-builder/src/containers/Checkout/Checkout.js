import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: 0
    };

    componentDidMount() {
        let price = 0;
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    canceledHandler = () => {
        this.props.history.goBack();
    };

    continuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    continueAction={this.continuedHandler}
                    cancelAction={this.canceledHandler}/>
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={(props) =>
                        (<ContactData
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            {...props}
                        />)
                    }/>
            </div>
        );
    }
}

export default Checkout;
