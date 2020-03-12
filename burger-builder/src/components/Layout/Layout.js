import React, {Fragment} from 'react';

const layout = (props) => (
    <Fragment>
        <div className="u-container">Toolbar, SideDrawer, Backdrop</div>
        <main className="">
            <div className="layout">
                {props.children}
            </div>
        </main>
    </Fragment>
);

export default layout;
