import React,{Component} from 'react';
import {connect} from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionType from '../../store/actions/actionTypes';
import * as actionTypes from '../../store/actions/index';

class BurgerBuilder extends Component {


    state = {
        totalPrice : 50,
        perchasable:false,
        perchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){

        // axios.get ('/ingredients.json')
        //      .then(res=>{

        //         // INGREDIENT_PRICE = res.data;
        //         // console.log(INGREDIENT_PRICE)

        //         Object.entries(res.data).forEach(
        //             ([key, value]) =>{ 
        //                 res.data[key] = 0
        //             }
        //         );

        //         this.setState({
        //             ingrediants : res.data
        //         })
                
        //      })
        //      .catch((err)=>{
        //          this.setState({error : true})
        //      })

        this.props.onInitIngredients();
    }

    updatePerchaseState (ingrediants) {
        const sum = Object.keys(ingrediants).map(bgKey=>(
            this.props.ings[bgKey]
        )).reduce((sum2,prev)=>(sum2 += prev),0);
        //this.setState({perchasable : sum > 0});
        return sum > 0;
    }

    // addIngredientHandler = (type) =>{
    //     const oldCount = this.props.ings[type];
    //     const newCount = oldCount + 1;
    //     const updatedIngrediants = {
    //         ...this.props.ings
    //     }
    //     updatedIngrediants[type] = newCount;
    //     const price = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice+price;
    //     this.setState({ingrediants:updatedIngrediants, totalPrice:newPrice});
    //     this.updatePerchaseState(updatedIngrediants);
    // }

    perchaseHandler = () =>{
        this.setState({perchasing:true});
    }

    perchaseCanselHandler = () =>{
        this.setState({perchasing:false});
    }

    perchaseContinueHandler = ()=>{
        // alert('You may continue');
        // const quaryParams = [];
        // for(let i in this.props.ings){
        //     console.log(i);
        //     quaryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }

        // const quaryString = quaryParams.join('&')
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' + quaryString,
        //     state: this.state.totalPrice
        // })
        this.props.OnInitPurchase();
        this.props.history.push('/checkout')
    }

    // removeIngredientsHandler = (type) =>{
    //     const oldCount = this.props.ings[type];
    //     if(oldCount > 0){
    //         const newCount = oldCount - 1;
    //         const updatedIngrediants = {
    //             ...this.props.ings
    //         } 
    //         updatedIngrediants[type] = newCount;
    //         const price = INGREDIENT_PRICE[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice-price;
    //         this.setState({ingrediants:updatedIngrediants,totalPrice:newPrice})
    //         this.updatePerchaseState(updatedIngrediants);
    //     }
    // }



    render() {

        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burgers = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        let orderSum = null
        if(this.props.ings) {
            burgers = (
                <Auxiliary>
                    <Burger ingrediants = {this.props.ings} />
                <BuildControls
                    ingrediantsAdded = {this.props.onAddIngrediants}
                    ingrediantsRemove = {this.props.onRemoveIngrediants}
                    disabled = {disabledInfo}
                    price = {this.props.price}
                    perchasable = {this.updatePerchaseState(this.props.ings)}
                    orderd = {this.perchaseHandler}
                />
                </Auxiliary>
            )

            orderSum = <OrderSummery ingrediants={this.props.ings}
                purchaseCanceled = {this.perchaseCanselHandler}
                purchaseContinued = {this.perchaseContinueHandler}
                price={this.props.price} />
        }

        if(this.state.loading){
            orderSum = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show ={this.state.perchasing} modelClosed={this.perchaseCanselHandler}>
                    {orderSum}
                </Modal>
                    {burgers}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingrediants,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    };
}

const mapDispatchToProps= dispatch =>{
    return{
        onAddIngrediants: (ingName) => dispatch(actionTypes.addIngredients(ingName)),
        onRemoveIngrediants: (ingName) => dispatch(actionTypes.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        OnInitPurchase : () => dispatch(actionTypes.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));