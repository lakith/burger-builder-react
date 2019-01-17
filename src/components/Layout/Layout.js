 import React from 'react';
 import Auxiliary from '../../hoc/Auxiliary';
 import Classes from '../Layout/Layout.css'

 const layout = ( props ) => (
     <Auxiliary>

        <div className = {Classes.Content}>Toolbar,SlideDrawer,BackDrop</div>
        <main>
            {props.children}
        </main>

     </Auxiliary>
 )

export default layout;