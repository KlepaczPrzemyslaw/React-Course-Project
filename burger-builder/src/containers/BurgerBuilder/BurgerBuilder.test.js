import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import burgerBuilderReducer from '../../store/reducers/burgerBuilder';
import BurgerBuilder from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    let store = createStore(burgerBuilderReducer);
    beforeEach(() => {
        wrapper = shallow(<Provider store={store}><BurgerBuilder store={null} onInitIngredients={() => {}}/></Provider>);
    });

    it('should not render [BuildControls] when ingredients are not fetched', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});
