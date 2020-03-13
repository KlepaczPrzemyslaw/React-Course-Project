import React, {Fragment, Component} from 'react';

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
            <Fragment>
                <Toolbar
                    showSideDrawer={this.sideDrawerOpenHandler}/>
                <SideDrawer
                    isMenuOpen={this.state.showSideDrawer}
                    closeSideDrawer={this.sideDrawerClosedHandler}/>
                <main className="layout__main">
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
