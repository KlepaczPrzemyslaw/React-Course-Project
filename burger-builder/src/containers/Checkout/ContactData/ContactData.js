import React, {Component, Fragment} from 'react';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                label: 'Name',
                elementConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                inputType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street: {
                inputType: 'input',
                label: 'Street',
                elementConfig: {
                    type: 'text',
                    name: 'street',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                inputType: 'input',
                label: 'Postal Code',
                elementConfig: {
                    type: 'text',
                    name: 'zipCode',
                    placeholder: 'Your Postal Code'
                },
                value: ''
            },
            country: {
                inputType: 'input',
                label: 'Country',
                elementConfig: {
                    type: 'text',
                    name: 'country',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            deliveryMethod: {
                inputType: 'select',
                label: 'Delivery Method',
                elementConfig: {
                    name: 'deliveryMethod',
                    options: [
                        {value: 'Fastest', key: 'fastest'},
                        {value: 'Cheapest', key: 'cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const orderData = {};
        Object.entries(this.state.orderForm)
            .map(([name, {value}]) =>
            orderData[name] = value
        );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            delivery: orderData
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

    inputChangedHandler = (event, inputId) => {
        const currentForm = {...this.state.orderForm};
        const currentInput = {...currentForm[inputId]};
        currentInput.value = event.target.value;
        currentForm[inputId] = currentInput;
        this.setState({orderForm: currentForm});
    };

    render() {
        let form = (
            <Fragment>
                <h4>Enter your contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {
                        Object.entries(this.state.orderForm).map(
                            ([key, value]) =>
                                <Input
                                    key={key}
                                    id={key}
                                    inputType={value.inputType}
                                    label={value.label}
                                    inputProps={value.elementConfig}
                                    onChange={(event) => this.inputChangedHandler(event, key)}
                                    value={value.value}/>)
                    }
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
