import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className="header">
        <div className="header__menu">
            ...
        </div>
        <div className="header__logo">
            <Logo/>
        </div>
        <nav className="header__nav">
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
