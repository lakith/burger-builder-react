import React from 'react';

import Burger from './../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';

import classes from './CheckOutSummery.css'


const checkoutSummery = (props) => {
    
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hope this taste well!</h1>
            <div style={{width:'100%'}}>
                <Burger ingrediants = {props.ingrediants} />
            </div> 
            <Button 
                btnType="Danger"
                clicked={props.canselHandler}
                >Cansel</Button>
            <Button 
                btnType="Success"
                clicked={props.continueHandler}
                >Continue</Button>
        </div>
    )

}

export default checkoutSummery;