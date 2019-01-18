import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

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
        perchasing:false
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
        alert('You may continue');
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

        return (
            <Auxiliary>
                <Modal show ={this.state.perchasing} modelClosed={this.perchaseCanselHandler}>
                    <OrderSummery ingrediants={this.state.ingrediants}
                     purchaseCanceled = {this.perchaseCanselHandler}
                     purchaseContinued = {this.perchaseContinueHandler}
                    />
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

export default BurgerBuilder;