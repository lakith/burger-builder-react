import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'

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
                <p>Continue to checkout</p>
        </Auxiliary>
    );
}

export default orderSummery;