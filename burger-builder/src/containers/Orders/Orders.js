import React, {Component, Fragment} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: null,
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(
                res => {
                    const fetchedData = [];
                    for (let key in res.data) {
                        fetchedData.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    this.setState({loading: false, orders: fetchedData})
                }
            ).catch(
            error => {
                this.setState({loading: false})
            });
    }

    render() {
        let orders = (<div className="u-margin-top-big"><Spinner/></div>);
        if (this.state.orders) {
            orders = (<div className="u-margin-top-medium">
                {
                    this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))
                }
            </div>);
        }

        return (
            <Fragment>
                {orders}
            </Fragment>
        );
    }
}

export default withErrorHandler(Orders, axios);
