import React, {useEffect, Suspense} from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/index';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = React.lazy(() =>
    import('./containers/Checkout/Checkout')
);

const Orders = React.lazy(() =>
    import('./containers/Orders/Orders')
);

const App = props => {
    useEffect(() => {
        props.onTryAutoAuth();
    }, []);

    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route
                    path="/checkout"
                    render={props => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Checkout {...props}/>
                        </Suspense>
                    )}/>
                <Route
                    path="/orders"
                    render={() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Orders/>
                        </Suspense>
                    )}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/logout" component={Logout}/>
                <Redirect to="/"/>
            </Switch>
        </Layout>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoAuth: () => dispatch(actionTypes.authInitState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
