import React, {Fragment} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Fragment>
        <Toolbar/>
        <SideDrawer/>
        <main className="layout__main">
            {props.children}
        </main>
    </Fragment>
);

export default layout;
