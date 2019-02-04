import * as actionType from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
    ingrediants : null,
    totalPrice : 50,
    error:false,
    building : false
};

const INGREDIENT_PRICE = {
    bacon: 200,
    cheese: 100,
    meat: 200,
    salad: 300,
}

// const reducer = (state=initialState,action) =>{

//     switch(action.type){
//         case(actionType.ADD_INGREDIANTS):
//             return{
//                 ...state,
//                 ingrediants : {
//                     ...state.ingrediants,
//                     [action.ingrediantName] : state.ingrediants[action.ingrediantName] + 1
//                 },
//                 totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingrediantName]
//             }
//         case(actionType.REMOVE_INGREDIANTS):
//         return{
//             ...state,
//             ingrediants : {
//                 ...state.ingrediants,
//                 [action.ingrediantName] : state.ingrediants[action.ingrediantName] - 1
//             },
//             totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingrediantName]
//         }
//         case(actionType.INIT_INGREDIENTS):
//         return{
//             ...state,
//            // ingrediants :  action.ingrediants, // correct this one - just wanted to refactor the order
//            ingrediants:{
//                 salad:action.ingrediants.salad,
//                 bacon:action.ingrediants.bacon,
//                 cheese:action.ingrediants.cheese,
//                 meat:action.ingrediants.meat
//            },
//             error:false,
//             totalPrice: 50
//         }
//         case(actionType.FETCH_INGREDIENTS_FAIL):
//         return{
//             ...state,
//             error:true
//         }
//         default:
//             return state;

//     }


// }

const addIngredients  = (state,action) => {
    const updatedIngredient = {[action.ingrediantName] : state.ingrediants[action.ingrediantName] + 1};
    const updatedIngredients = updatedObject(state.ingrediants,updatedIngredient);
    const updatedState = {
            ingrediants : updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingrediantName],
            building:true
            }
    return updatedObject(state,updatedState);
}

const removeIngredients = (state,action) => {
    const updatedIngredient2 = {[action.ingrediantName] : state.ingrediants[action.ingrediantName] - 1};
    const updatedIngredients2= updatedObject(state.ingrediants,updatedIngredient2);
    const updatedState2 = {
        ingrediants : updatedIngredients2,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingrediantName],
        building : true
    }
    return updatedObject(state,updatedState2);
}

const initIngredients = (state,action) =>{
    return updatedObject (state,{
        // ingrediants :  action.ingrediants, // correct this one - just wanted to refactor the order
        ingrediants:{
            salad:action.ingrediants.salad,
            bacon:action.ingrediants.bacon,
            cheese:action.ingrediants.cheese,
            meat:action.ingrediants.meat
        },
        error:false,
        totalPrice: 50,
        building:false
    })
}

const fatchIngredientsFail = (state,action) => {
    return updatedObject(state,{
        error:true
    })
}

const reducer = (state=initialState,action) =>{

    switch(action.type){
        case(actionType.ADD_INGREDIANTS):
                return addIngredients(state,action);
        case(actionType.REMOVE_INGREDIANTS):
                return removeIngredients(state,action);
        case(actionType.INIT_INGREDIENTS): 
                return initIngredients(state,action)
        case(actionType.FETCH_INGREDIENTS_FAIL):
                return fatchIngredientsFail(state,action);
        default:
                return state;

    }


}

export default reducer;