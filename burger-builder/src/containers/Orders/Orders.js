import React, {useEffect, Fragment} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTyps from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const Orders = props => {
    // Dispatch
    const dispatch = useDispatch();
    const onFetchOrders = (token, userId) => dispatch(actionTyps.fetchOrders(token, userId));

    // State
    const ordersFromApi = useSelector(state => state.order.orders);
    const loading = useSelector(state => state.order.loading);
    const error = useSelector(state => state.order.error);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        onFetchOrders(token, userId);
    }, []);

    let orders = (<div className="u-margin-top-big"><Spinner/></div>);
    if (!loading && !error) {
        orders = (
            <div>
                {
                    ordersFromApi?.map(order => (
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

export default withErrorHandler(Orders, axios);
