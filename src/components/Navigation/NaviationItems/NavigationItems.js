import React from 'react'

import classes from '../NaviationItems/NavigationItems.css';
import NavigationItem from './NavigationItem/Navigationitem'

const navigationItems=(props)=>{
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>
                Burger Builder
            </NavigationItem>
            <NavigationItem link="/">
                Checkout
            </NavigationItem>
        </ul>
    )
}

export default navigationItems;