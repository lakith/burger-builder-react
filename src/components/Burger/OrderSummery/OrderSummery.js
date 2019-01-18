import React,{Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {

    componentWillUpdate(){
        console.log("[Order Summery] Component Will Update");
    }

    render(){
        const ingrediants = Object.keys(this.props.ingrediants)
                            .map(bgKey => (
                                <li key={bgKey}>
                                    <span style={{textTransform:'capitalize'}}> : {bgKey}</span>
                                    {this.props.ingrediants[bgKey]}
                                </li>
                            ));

        return (
            <Auxiliary>
                    <h3>Your Order</h3>
                    <p>A Delicious burger with following ingrediants</p>
                    <ul>
                        {ingrediants}
                    </ul>
                    <p> <strong>Total Price : {this.props.price} /=</strong></p>
                    <p>Continue to checkout</p>
                    <Button btnType ="Danger" clicked={this.props.purchaseCanceled}>Cansel</Button>
                    <Button btnType ="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Auxiliary>
        );
    }
}

export default OrderSummery;