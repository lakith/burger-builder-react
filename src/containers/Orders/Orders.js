import React ,{Component} from 'react';

import Order from '../../order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{

    componentDidMount(){
        // axios.get('/orders.json').then(res=>{
        //     console.log(res);
        //     const fetchOrder=[];
        //     for(let key in res.data){
        //         fetchOrder.push({
        //             ...res.data[key],
        //             id: key
        //         });
        //     }
        //     this.setState({loading:false,orders:fetchOrder});
        // }).catch(err=>{
        //     this.setState({loading:false});
        // })
        this.props.onOrdersLoad(this.props.token,this.props.userId);
    }

    render(){

        let orders = <Spinner />

        if(! this.props.loading){
            orders = (
            <div>
                {this.props.orders.map(order=>(
                    <Order key={order.id}
                           ingredients={order.ingrediants}
                           price={order.price}
                    />
                ))}
            </div>
            )
        }

        return orders;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.order.loading,
        orders : state.order.order,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onOrdersLoad : (token,userId) => dispatch(actionTypes.fatchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios));