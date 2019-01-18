import React from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import BackDrop from '../Backdrop/BackDrop';

const modal = (props) =>{
   
    return(
        <Auxiliary>
            <BackDrop show = {props.show} clicked = {props.modelClosed}/>
            <div 
            className={classes.Modal}
            style={{transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity:props.show ? '1' : '0'}}
            >
                {props.children}
            </div>
        </Auxiliary>
    )
}

export default modal;