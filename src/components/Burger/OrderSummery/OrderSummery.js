import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummery = (props) =>{

    const ingrediants = Object.keys(props.ingrediants)
                        .map(bgKey => (
                            <li key={bgKey}>
                                <span style={{textTransform:'capitalize'}}> : {bgKey}</span>
                                {props.ingrediants[bgKey]}
                            </li>
                        ));

    return (
        <Auxiliary>
                <h3>Your Order</h3>
                <p>A Delicious burger with following ingrediants</p>
                <ul>
                    {ingrediants}
                </ul>
                <p> <strong>Total Price : {props.price} /=</strong></p>
                <p>Continue to checkout</p>
                <Button btnType ="Danger" clicked={props.purchaseCanceled}>Cansel</Button>
                <Button btnType ="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Auxiliary>
    );
}

export default orderSummery;