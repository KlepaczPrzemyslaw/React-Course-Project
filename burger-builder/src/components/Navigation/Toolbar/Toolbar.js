import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import PropTypes from "prop-types";

const toolbar = (props) => (
    <header className="header">
        <div className="header__menu">
            <div
                className="header__menu-icon"
                onClick={props.showSideDrawer}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div className="header__logo">
            <Logo/>
        </div>
        <nav className="header__nav">
            <NavigationItems
                isAuthenticated={props.isAuthenticated}/>
        </nav>
    </header>
);

toolbar.propTypes = {
    showSideDrawer: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default toolbar;
