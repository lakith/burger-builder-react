import React , {Component} from 'react'
import axios from '../../../axios-orders';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm:{
                name:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value:''
                },
                street:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Street'
                    },
                    value:''
                },
                zipcode:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your ZipCode'
                    },
                    value:''
                },
                country:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Country'
                    },
                    value:''
                },
                email:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Email'
                    },
                    value:''
                },
                delivary:{
                    elementType:"select",
                    elementConfig :{
                        options:[
                            {value:'fastest', displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}
                        ]
                    },
                    value:''
                }
        },
        loading:false
    }

    orderHandler = (event)=>{
        event.preventDefault();
        console.log(this.props);
        
        const formData = {};

        for(let formElement in this.state.orderForm ){
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        this.setState({loading:true});
        const order = {
            ingrediants : this.props.ingrediants,
            price : this.props.totalPrice,
            orderData : formData
        }

        axios.post('orders.json',order)
            .then((res)=>{
                this.setState({loading:false});
                this.props.history.push('/');
            }).catch(err=>{
                this.setState({loading:false});
            });
    }

    changeHandler = (event,inputIdentifier)=>{
        //console.log(event.target.value); // print the event trigger data
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({
            orderForm:updatedOrderForm
        })
    }

    render(){

        let formElementsArray=[];

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input elementType={formElement.config.elementType} 
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               changed={(event)=>this.changeHandler(event,formElement.id)}
                               key={formElement.id} />
                    ))
                    }

                    <Button btnType="Success">Order</Button>
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