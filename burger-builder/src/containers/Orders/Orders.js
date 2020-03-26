import React, {useEffect, Fragment} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTyps from '../../store/actions/index';
import {connect} from 'react-redux';

const Orders = props => {
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders = (<div className="u-margin-top-big"><Spinner/></div>);
    if (!props.loading && !props.error) {
        orders = (
            <div>
                {
                    props.orders?.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))
                }
            </div>
        );
    }

    return (
        <Fragment>
            {orders}
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionTyps.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
