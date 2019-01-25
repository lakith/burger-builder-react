import React from 'react';

import classes from '../order/Order.css';

const order = (props) =>{

    const ingredients =[];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name:ingredientName,
            ammount:props.ingredients[ingredientName]
        });
    }

    const ingredientOutput= ingredients.map(ig=>{
        return(
            <span 
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'
            }}
            key={ig.name}>{ig.name} ({ig.ammount})</span>
        )
    })

    return(
    <div className={classes.Order}>
        <p>Ingredients : {ingredientOutput}</p>
        <p>Price <strong>SLR {Number.parseInt(props.price)}.00 /=</strong></p>
    </div>
    )
}

export default order;