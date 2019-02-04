import React from 'react'

import classes from '../NaviationItems/NavigationItems.css';
import NavigationItem from './NavigationItem/Navigationitem'

const navigationItems=(props)=>{
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact> Burger Builder  </NavigationItem>
           {props.isAuth ? <NavigationItem link="/orders"> Orders </NavigationItem> : null }
           {props.isAuth ? <NavigationItem link="/logout">Log out</NavigationItem> :<NavigationItem link="/auth">Sign in</NavigationItem>} 
        </ul>
    )
}

export default navigationItems;