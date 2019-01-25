import React from 'react'

import classes from '../NaviationItems/NavigationItems.css';
import NavigationItem from './NavigationItem/Navigationitem'

const navigationItems=(props)=>{
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact> 
                Burger Builder
            </NavigationItem>
            <NavigationItem link="/orders">
                Orders
            </NavigationItem>
        </ul>
    )
}

export default navigationItems;