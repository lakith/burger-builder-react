import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import CheckoutSummery from '../../order/CheckoutSummery/CheckoutSummery'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // state = {
    //     ingrediants : {
    //         bacon:1,
    //         cheese: 1,
    //         meat: 1,
    //         salad: 1,
    //     },totalPrice:0
    // }

    // componentDidMount(){
    //     console.log(this.props.location.state);
    //     let totalPrice = this.props.location.state;
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingrediants= {};
    //     for(let param of query.entries()){
    //         // ['salad', '1']
    //         ingrediants[param[0]] = +param[1]; // typecasting to number
    //     }
    //     this.setState({ingrediants:ingrediants,totalPrice:totalPrice})
    // }

    canselHandler = ()=>{
        this.props.history.goBack();
    }
    continueHandler = ()=>{
        this.props.history.replace('/checkout/content-data');
    }

    render() { 

        let summery = <Redirect to="/" />

        if(this.props.ing){
            const purchaseRedirect = this.props.purchased ? <Redirect to ="/" /> : null ; 
            summery = (
             <div>
                {purchaseRedirect}
                <CheckoutSummery
                 ingrediants={this.props.ing}
                 canselHandler={this.canselHandler}
                 continueHandler={this.continueHandler}/>

                <Route path = {this.props.match.path + '/content-data'} 
                        component={ContactData}
                />
            </div>
            )
        }

        return summery;
           
        
    }
}

const mapStateToProps = state =>{
    return {
        ing: state.burgerBuilder.ingrediants,
        price: state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps,null)(Checkout);