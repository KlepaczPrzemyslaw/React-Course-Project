import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NavLink} from 'react-router-dom';
import NavigationItems from './NavigationItems';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems isAuthenticated={false}/>);
    });

    it('should render 2 nav [li] items if not authenticated', () => {
        expect(wrapper.find('li')).toHaveLength(2);
    });

    it('should render 3 nav [li] items if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find('li')).toHaveLength(3);
    });

    it('should render [/logout] nav item if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavLink to="/logout">Logout</NavLink>)).toEqual(true);
    });
});
