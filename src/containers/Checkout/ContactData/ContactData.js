import React , {Component} from 'react'
import axios from '../../../axios-orders';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        console.log(this.props);

        this.setState({loading:true});
        const order = {
            ingrediants : this.props.ingrediants,
            price : this.props.totalPrice,
            customer : {
                name:'Lakith Muthugala231',
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
                this.setState({loading:false});
                this.props.history.push('/');
            }).catch(err=>{
                this.setState({loading:false});
            });
    }

    render(){

        let form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="name" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="name" placeholder="Your Street" />
                    <input className={classes.Input} type="text" name="name" placeholder="Your Postalcode" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
        );

        if(this.state.loading){
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;