import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from "prop-types";

const navigationItems = (props) => {
    let navItems = null;
    if (props.isAuthenticated) {
        navItems = (
            <Fragment>
                <li className="header__navigation-item">
                    <NavLink to="/orders">Orders</NavLink>
                </li>
                <li className="header__navigation-item">
                    <NavLink to="/logout">Logout</NavLink>
                </li>
            </Fragment>
        );
    } else {
        navItems = (
            <Fragment>
                <li className="header__navigation-item">
                    <NavLink to="/auth">Authenticate</NavLink>
                </li>
            </Fragment>
        )
    }

    return (
        <ul className="header__navigation">
            <li className="header__navigation-item">
                <NavLink to="/" exact>Burger</NavLink>
            </li>
            {navItems}
        </ul>
    );
};

navigationItems.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default navigationItems;
