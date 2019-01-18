import React from 'react';
import classes from '../../UI/Backdrop/BackDrop.css'

const backDrop = (props) => {
   
   return( 
       props.show ? <div className={classes.BackDrop} onClick={props.clicked}></div> : null
       )
}

export default backDrop;