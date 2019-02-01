import React from 'react';

import classes from './../Burger/Burger.css';
import BurgerIngrediants from './BurgerIngrediants/BurgerIngrediants'

const burger = (props)=>{

    let trasnformedIngrediants = Object.keys(props.ingrediants)
                    .map(bgKey => {
                        return [...Array(props.ingrediants[bgKey])].map((_,index)=>{
                            return(
                                <BurgerIngrediants key={bgKey + index} type ={bgKey}/>
                            );
                        })
                    }).reduce((accumilator,currentValue)=>accumilator.concat(currentValue),[]);

                   // console.log(trasnformedIngrediants);

    if(trasnformedIngrediants.length === 0){
        trasnformedIngrediants = <p> Please start adding ingrediants</p>
    }
    return(
        <div className = {classes.Burger}>
            <BurgerIngrediants type="bread-top" />
             {trasnformedIngrediants}
            <BurgerIngrediants type="bread-bottom" />
        </div>
    )
}

export default burger;
