import React,{Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
    salad: 100,
    cheese: 300,
    meat : 200,
    bacon : 350
}
class BurgerBuilder extends Component {

    state = {
        ingrediants : {
            cheese : 0,
            salad : 0,
            bacon : 0,
            meat : 0
        },
        totalPrice : 50,
        perchasable:false,
        perchasing:false,
        loading:false
    }

    updatePerchaseState (ingrediants) {
        const sum = Object.keys(ingrediants).map(bgKey=>(
            ingrediants[bgKey]
        )).reduce((sum2,prev)=>(sum2 += prev),0);
        this.setState({perchasable : sum > 0});
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingrediants[type];
        const newCount = oldCount + 1;
        const updatedIngrediants = {
            ...this.state.ingrediants
        }
        updatedIngrediants[type] = newCount;
        const price = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+price;
        this.setState({ingrediants:updatedIngrediants, totalPrice:newPrice});
        this.updatePerchaseState(updatedIngrediants);
    }

    perchaseHandler = () =>{
        this.setState({perchasing:true});
    }

    perchaseCanselHandler = () =>{
        this.setState({perchasing:false});
    }

    perchaseContinueHandler = ()=>{
        // alert('You may continue');
        this.setState({loading:true});
        const order = {
            ingrediants : this.state.ingrediants,
            price : this.state.totalPrice,
            customer : {
                name:'Lakith Muthugala',
                address: {
                    street:"Thilakavilla, Halthota",
                    zipcode:'12323',
                    country:'Sri lanka'
                },
                email:'lakith1995@gmail.com'
            },
            delivary:'Fastest'
        }

        axios.post('orders.json',order)
            .then((res)=>{
                this.setState({loading:false,perchasing:false});
            }).catch(err=>{
                this.setState({loading:false,perchasing:false});
            });

    }

    removeIngredientsHandler = (type) =>{
        const oldCount = this.state.ingrediants[type];
        if(oldCount > 0){
            const newCount = oldCount - 1;
            const updatedIngrediants = {
                ...this.state.ingrediants
            } 
            updatedIngrediants[type] = newCount;
            const price = INGREDIENT_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice-price;
            this.setState({ingrediants:updatedIngrediants,totalPrice:newPrice})
            this.updatePerchaseState(updatedIngrediants);
        }
    }



    render() {

        const disabledInfo = {...this.state.ingrediants};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSum = <OrderSummery ingrediants={this.state.ingrediants}
                                        purchaseCanceled = {this.perchaseCanselHandler}
                                        purchaseContinued = {this.perchaseContinueHandler}
                                        price={this.state.totalPrice}
                            />
        if(this.state.loading){
            orderSum = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal show ={this.state.perchasing} modelClosed={this.perchaseCanselHandler}>
                    {orderSum}
                </Modal>
                <Burger ingrediants = {this.state.ingrediants} />
                <BuildControls
                    ingrediantsAdded = {this.addIngredientHandler}
                    ingrediantsRemove = {this.removeIngredientsHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    perchasable = {this.state.perchasable}
                    orderd = {this.perchaseHandler}
                />
            </Auxiliary>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);