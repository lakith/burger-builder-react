import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/Navigationitem'

configure({adapter: new Adapter()});

describe('<NavigationItems />',()=> {

    let wrapper;

    beforeEach (()=>{
        wrapper = shallow(<NavigationItems />)
    });

    it('should render two <NavigationItems /> if not authenticated', ()=> {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems /> if authenticated', ()=> {
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should have a logout button', ()=> {
        wrapper.setProps({isAuth:true})
        expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true);
    });

});