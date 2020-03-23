import React, {Component} from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/index';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoAuth();
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/logout" component={Logout}/>
                    <Redirect to="/"/>
                </Switch>
            </Layout>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoAuth: () => dispatch(actionTypes.authInitState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
