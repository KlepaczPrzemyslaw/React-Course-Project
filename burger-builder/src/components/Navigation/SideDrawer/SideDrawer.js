import React, {Fragment} from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PropTypes from "prop-types";

const sideDrawer = (props) => {
    const additionalClass = props.isMenuOpen ? 'side-drawer__open' : 'side-drawer__closed';

    return (
        <Fragment>
            <Backdrop show={props.isMenuOpen} click={props.closeSideDrawer}/>
            <div className={"side-drawer " + additionalClass}>
                <div className="side-drawer__logo">
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
};

sideDrawer.propTypes = {
    closeSideDrawer: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool.isRequired
};

export default sideDrawer;
