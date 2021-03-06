import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NaviationItems/NavigationItems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'


const toolbar = (props) =>{
   
   return(
       <header className={classes.Toolbar}>
           <div>
                <DrawerToggle toggle={props.toggle} />
            </div>
           <div className={classes.Logo}>
                <Logo />
           </div>
           <nav className={classes.DesktopOnly}>
               <NavigationItems isAuth = {props.isAuth}/>
           </nav>
       </header>
   )

}

export default toolbar;