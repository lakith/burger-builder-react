import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../../shared/utility'

const initialState = {
    order : [],
    loading:false,
    purchased:false
}

// const reducer = (state = initialState,action) => {
//     switch(action.type){
//         case actionTypes.PURCHASE_INIT:
            
//             return{
//                 ...state,
//                 purchased: false
//             }
//         case actionTypes.PURCHASE_BURGER_START : 
//             return {
//                 ...state,
//                 loading:true
//             }
//         case actionTypes.PURCHASE_BURGER_SUCCESS: 
//             const newOrder = {
//                 ...action.orderData,
//                 id:action.ortderId
//             }    

//             return{
//                 ...state,
//                 loading:false,
//                 purchased:true,
//                 action: state.order.concat(newOrder)
//             };
//         case actionTypes.PURCHASE_BURGER_FAIL:
//             return{
//                 ...state,
//                 loading:false
//             };
//         case actionTypes.FETCH_ORDERS_START:
//             return{
//                 ...state,
//                 loading:true
//             };
//         case actionTypes.FETCH_ORDERS_SUCCESS:
//         return{
//             ...state,
//             order:action.order ,
//             loading : false
//         };
//         case actionTypes.FETCH_INGREDIENTS_FAIL:
//         return {
//             ...state,
//             loading: false
//         };
//         default:
//             return state; 
//     }
// }

const perchaseInit = (state ,action) => {
    return updatedObject (state,{purchased: false}) ;
}

const perchaseBurgerStart = (state,action) => {
    return updatedObject (state, {loading:true});
}

const perchaseBurtgerSuccess = (state,action) => {
    const newOrder = {
        ...action.orderData,
        id:action.ortderId
    };
    return updatedObject (state ,{
                            loading:false,
                            purchased:true,
                            action: state.order.concat(newOrder)
                        } );
}

const percahseBurgerFailed = (state , action) => {
    return updatedObject (state , {
        loading:false
    });
}

const fetchOrdersStart = (state ,action) => {
    return updatedObject (state,{ loading:true }) ;
}

const fetchOrdersSuccess = (state,action) => {
    return updatedObject (state ,{
        order:action.order ,
        loading : false
    } )
}

const fetchOrdersFail = (state,action) => {
    return updatedObject (state , { loading: false })
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return perchaseInit(state,action) ;
        case actionTypes.PURCHASE_BURGER_START : 
            return perchaseBurgerStart(state,action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: 
            return perchaseBurtgerSuccess(state,action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return percahseBurgerFailed(state,action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state,action)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return fetchOrdersFail(state,action);
        default:
            return state; 
    }
}

export default reducer;