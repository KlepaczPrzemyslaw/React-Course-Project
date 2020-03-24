import React, {Component} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    };

    render () {
        return (
            <div className="layout">
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    showSideDrawer={this.sideDrawerOpenHandler}/>
                <div className="layout__fill-toolbar"></div>
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    isMenuOpen={this.state.showSideDrawer}
                    closeSideDrawer={this.sideDrawerClosedHandler}/>
                <main className="layout__main">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

export default connect(mapStateToProps)(Layout);
