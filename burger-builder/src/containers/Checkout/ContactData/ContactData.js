import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                inputType: 'input',
                label: 'Email',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                inputType: 'input',
                label: 'Street',
                elementConfig: {
                    type: 'text',
                    name: 'street',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                inputType: 'input',
                label: 'Postal Code',
                elementConfig: {
                    type: 'text',
                    name: 'zipCode',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                inputType: 'input',
                label: 'Country',
                elementConfig: {
                    type: 'text',
                    name: 'country',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
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
                value: 'fastest',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            }
        },
        isOrderFormValid: false,
        loading: false
    };

    checkValidity = (value, rules) => {
        if (rules.required && value.trim() === '') {
            return false;
        }
        if (rules.minLength && value.trim().length < rules.minLength) {
            return false;
        }
        if (rules.maxLength && value.trim().length > rules.maxLength) {
            return false;
        }

        // Input is valid
        return true;
    };

    orderHandler = (event) => {
        event.preventDefault();
        if (!this.state.isOrderFormValid) {
            return;
        }

        this.setState({loading: true});
        const orderData = {};
        Object.entries(this.state.orderForm)
            .map(([name, {value}]) =>
            orderData[name] = value
        );
        const order = {
            ingredients: this.props.ings,
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
        currentInput.valid = this.checkValidity(currentInput.value, currentInput.validation);
        currentInput.touched = true;

        let formIsValid = true;
        Object.values(currentForm).forEach(({valid}) => {
            formIsValid = valid && formIsValid;
        });

        this.setState({orderForm: currentForm, isOrderFormValid: formIsValid});
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
                                    value={value.value}
                                    valid={value.valid}
                                    touched={value.touched}/>)
                    }
                </form>
                <button
                    className="btn btn--success"
                    onClick={this.orderHandler}
                    disabled={!this.state.isOrderFormValid}>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);
