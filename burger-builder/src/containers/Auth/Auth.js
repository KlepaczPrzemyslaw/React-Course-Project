import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import * as actionTypes from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {checkValidity} from "../../shared/validation";

const Auth = props => {
    const [authControls, setAuthControls] = useState({
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
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            inputType: 'input',
            label: 'Password',
            elementConfig: {
                type: 'password',
                name: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        }
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const inputChangedHandler = (event, inputId) => {
        const currentForm = {...authControls};
        const currentInput = {...currentForm[inputId]};
        currentInput.value = event.target.value;
        currentInput.valid = checkValidity(currentInput.value, currentInput.validation);
        currentInput.touched = true;
        currentForm[inputId] = currentInput;

        let formIsValid = true;
        Object.values(currentForm).forEach(({valid}) => {
            formIsValid = valid && formIsValid;
        });

        setAuthControls(currentForm);
        setIsFormValid(formIsValid);
    };

    const signActionHandler = () => {
        const {email, password} = authControls;
        props.onAuth(email.value, password.value, isSignUp);
    };

    const switchModeHandler = () => {
        setIsSignUp(!isSignUp);
    };

    // Render

    let site = null;
    if (props.isAuthenticated) {
        site = props.burgerWasBuilt ?
            (<Redirect to="/checkout"/>) :
            (<Redirect to="/"/>);
    } else if (props.loading) {
        site = (<div className="u-margin-top-medium"><Spinner/></div>);
    } else {
        const header = isSignUp ?
            (<h1 className="auth__sign-up-header">Sign Up</h1>) :
            (<h1 className="auth__login-header">Login</h1>);

        const form = Object.entries(authControls).map(
            ([key, value]) =>
                <Input
                    key={key}
                    id={key}
                    inputType={value.inputType}
                    label={value.label}
                    inputProps={value.elementConfig}
                    onChange={(event) => inputChangedHandler(event, key)}
                    value={value.value}
                    valid={value.valid}
                    touched={value.touched}/>);

        const error = props.error ?
            (<p className="auth__error">Error Code: {props.error?.message}</p>) :
            null;

        site = (
            <div className="auth__form">
                {header}
                <form>
                    {form}
                    {error}
                    <button
                        className="btn btn--success"
                        onClick={signActionHandler}
                        type="button"
                        disabled={!isFormValid}>
                        Check It
                    </button>
                </form>

                <button
                    className={"btn " + (isSignUp ? 'btn--primary' : 'btn--danger')}
                    onClick={switchModeHandler}
                    type="button">
                    Switch to: {isSignUp ? 'Login' : 'Sign Up'}
                </button>
            </div>
        );
    }

    return (
        <div className="auth">
            {site}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.token,
        burgerWasBuilt: state.burgerBuilder.burgerWasBuilt,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionTypes.authSubmit(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
