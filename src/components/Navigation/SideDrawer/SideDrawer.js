import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NaviationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/BackDrop';
import Auxiliary from '../../../hoc/Auxiliary'

const sideDrawer = (props) =>{

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
            </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;