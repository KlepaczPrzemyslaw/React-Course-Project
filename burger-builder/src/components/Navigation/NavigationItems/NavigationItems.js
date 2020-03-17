import React from 'react';
import {NavLink} from 'react-router-dom';

const navigationItems = () => (
    <ul className="header__navigation">
        <li className="header__navigation-item">
            <NavLink to="/" exact>My Burger</NavLink>
        </li>
        <li className="header__navigation-item">
            <NavLink to="/orders">Orders</NavLink>
        </li>
    </ul>
);

export default navigationItems;
