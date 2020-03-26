import React, {useState} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerOpened(false);
    };

    const sideDrawerOpenHandler = () => {
        setSideDrawerOpened(true);
    };

    return (
        <div className="layout">
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                showSideDrawer={sideDrawerOpenHandler}/>
            <div className="layout__fill-toolbar"></div>
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                isMenuOpen={sideDrawerOpened}
                closeSideDrawer={sideDrawerClosedHandler}/>
            <main className="layout__main">
                {props.children}
            </main>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

export default connect(mapStateToProps)(Layout);
