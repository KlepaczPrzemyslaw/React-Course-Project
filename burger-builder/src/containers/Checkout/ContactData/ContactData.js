import React, {Component, Fragment} from 'react';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },

        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Me',
                address: {
                    street: 'street',
                    zipCode: '44-456',
                    country: 'country'
                },
                email: 'someEmail'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <Fragment>
                <h4>Enter your contact Data</h4>
                <form>
                    <input type="text"/>
                </form>
                <button
                    className="btn btn--success"
                    onClick={this.orderHandler}>
                    Order
                </button>
            </Fragment>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className="contact-data">
                {form}
            </div>
        );
    }
}

export default ContactData;
