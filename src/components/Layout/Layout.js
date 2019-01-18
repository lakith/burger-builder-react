 import React from 'react';
 import Auxiliary from '../../hoc/Auxiliary';
 import Classes from '../Layout/Layout.css';
 import Toolbar from '../Navigation/Toolbar/Toolbar'
 import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

 const layout = ( props ) => (
     <Auxiliary>

        <Toolbar />
        <SideDrawer />
        <main className = {Classes.Content}>
            {props.children}
        </main>

     </Auxiliary>
 )

export default layout;