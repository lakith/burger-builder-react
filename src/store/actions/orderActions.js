import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) =>{

    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        ortderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('orders.json?auth='+token,orderData)
            .then((res)=>{
                dispatch(purchaseBurgerSuccess(res.data.name,orderData));
            }).catch(err=>{
                dispatch(purchaseBurgerFail(err));
            });
    }
}

export const purchaseInit = () =>{
    return {
        type:actionTypes.PURCHASE_INIT
    };
}

export const fatchOrdersSuccess = (order) => {
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        order: order
    }
}

export const fatchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error : error
    }
}

export const fatchOrdersStart = () => {
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fatchOrders = (token,userID) =>{
    return dispatch => {
        dispatch(fatchOrdersStart())
        const quaryParams = '?auth=' +token + '&orderBy="userId"&equalTo="'+userID+'"';
        axios.get('/orders.json'+quaryParams).then(res=>{
            const fetchOrder=[];
            for(let key in res.data){
                fetchOrder.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fatchOrdersSuccess(fetchOrder))
        }).catch(err=>{
            dispatch(fatchOrdersFail(err))
        })
    }
}