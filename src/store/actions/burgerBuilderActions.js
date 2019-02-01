import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const addIngredients = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIANTS,
        ingrediantName : name
    }
}

export const removeIngredients = (name) =>{
    return{
        type : actionTypes.REMOVE_INGREDIANTS,
        ingrediantName : name
    }
}

export const getIngredients = (ingrediants) => {

    return{
        type:actionTypes.INIT_INGREDIENTS,
        ingrediants:ingrediants
    }


}

export const fetchIngredientsFail = () => {
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return dispatch =>{

        axios.get ('/ingredients.json')
        .then(res=>{
        Object.entries(res.data).forEach(
            ([key, value]) =>{ 
                res.data[key] = 0
            }
        );

            dispatch(getIngredients(res.data));
   
        })
        .catch((err)=>{
            dispatch(fetchIngredientsFail())
        })

    }
}


axios.get ('/ingredients.json')
.then(res=>{
   Object.entries(res.data).forEach(
       ([key, value]) =>{ 
           res.data[key] = 0
       }
   );

    return{
        type : actionTypes.INIT_INGREDIENTS,
        ingrediants : res.data
    }
   
})
.catch((err)=>{
    this.setState({error : true})
})