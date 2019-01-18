import React from 'react';
import classes from '../BuildControls/BuildControls.css';
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label : 'Salad' , type: 'salad'},
    {label : 'Bacon' , type: 'bacon'},
    {label : 'Cheese' , type: 'cheese'},
    {label : 'Meat' , type: 'meat'}
];

const buildControls = (props) =>{
    return (
        <div className={classes.BuildControls}>
            <p className={classes.InlinePara}>Total Price  - <strong>{props.price}.00/=</strong></p>
            {controls.map(con=>
                <BuildControl 
                    key={con.label}
                    label = {con.label}
                    added = {()=>props.ingrediantsAdded(con.type)}
                    remove = {()=>props.ingrediantsRemove(con.type)}
                    disabled = {props.disabled[con.type]}
                 />
            )}
            <button className={classes.OrderButton} onClick={props.orderd} disabled={!props.perchasable}>Order Now</button>
        </div>
    )
}

export default buildControls;