import React, {Component, Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    canceledHandler = () => {
        this.props.history.goBack();
    };

    continuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = (<Redirect to="/"/>);
        if (this.props.ings) {
            summary =
                this.props.purchased ?
                    (
                        <Redirect to="/"/>
                    ) :
                    (
                        <Fragment>
                            <CheckoutSummary
                                ingredients={this.props.ings}
                                continueAction={this.continuedHandler}
                                cancelAction={this.canceledHandler}/>
                            <Route
                                path={`${this.props.match.path}/contact-data`}
                                component={ContactData}/>
                        </Fragment>
                    );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
