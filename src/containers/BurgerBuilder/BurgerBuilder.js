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
    bacon: 200,
    cheese: 100,
    meat: 200,
    salad: 300,
}
class BurgerBuilder extends Component {


    state = {
        ingrediants : null,
        totalPrice : 50,
        perchasable:false,
        perchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){

        axios.get ('/ingredients.json')
             .then(res=>{

                // INGREDIENT_PRICE = res.data;
                // console.log(INGREDIENT_PRICE)

                Object.entries(res.data).forEach(
                    ([key, value]) =>{ 
                        res.data[key] = 0
                    }
                );

                this.setState({
                    ingrediants : res.data
                })
                
             })
             .catch((err)=>{
                 this.setState({error : true})
             })
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
        let burgers = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        let orderSum = null
        if(this.state.ingrediants) {
            burgers = (
                <Auxiliary>
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

            orderSum = <OrderSummery ingrediants={this.state.ingrediants}
                purchaseCanceled = {this.perchaseCanselHandler}
                purchaseContinued = {this.perchaseContinueHandler}
                price={this.state.totalPrice} />
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

export default withErrorHandler(BurgerBuilder,axios);