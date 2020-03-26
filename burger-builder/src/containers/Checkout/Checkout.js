import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout = props => {
    const canceledHandler = () => {
        props.history.goBack();
    };

    const continuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = (<Redirect to="/"/>);
    if (props.ings) {
        summary =
            props.purchased ?
                (
                    <Redirect to="/"/>
                ) :
                (
                    <Fragment>
                        <CheckoutSummary
                            ingredients={props.ings}
                            continueAction={continuedHandler}
                            cancelAction={canceledHandler}/>
                        <Route
                            path={`${props.match.path}/contact-data`}
                            component={ContactData}/>
                    </Fragment>
                );
    }

    return summary;
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
