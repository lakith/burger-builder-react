import * as actionType from './action'

const initialState = {
    ingrediants : {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0,
    },
    totalPrice : 50,
};

const INGREDIENT_PRICE = {
    bacon: 200,
    cheese: 100,
    meat: 200,
    salad: 300,
}

const reducer = (state=initialState,action) =>{

    switch(action.type){
        case(actionType.ADD_INGREDIANTS):
            return{
                ...state,
                ingrediants : {
                    ...state.ingrediants,
                    [action.ingrediantName] : state.ingrediants[action.ingrediantName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingrediantName]
            }
        case(actionType.REMOVE_INGREDIANTS):
        return{
            ...state,
            ingrediants : {
                ...state.ingrediants,
                [action.ingrediantName] : state.ingrediants[action.ingrediantName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingrediantName]
        }
        default:
            return state;

    }


}

export default reducer;