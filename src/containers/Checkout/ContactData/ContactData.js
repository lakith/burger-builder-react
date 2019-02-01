import React , {Component} from 'react'
import axios from '../../../axios-orders';
import {connect} from 'react-redux';

import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'

class ContactData extends Component {

    state = {
        orderForm:{
                name:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    errorMessage:"Please Enter a valid name"
                },
                street:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    errorMessage:"Please Enter a valid street"
                },
                zipcode:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your ZipCode'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false,
                    errorMessage:"Please Enter a valid ZipCode"
                },
                country:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    errorMessage:"Please Enter a valid Country"
                },
                email:{
                    elementType:"input",
                    elementConfig :{
                        type:'text',
                        placeholder: 'Your Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false,
                    errorMessage:"Please Enter a valid Email"
                },
                delivary:{
                    elementType:"select",
                    elementConfig :{
                        options:[
                            {value:'fastest', displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}
                        ]
                    },
                    value:'cheapest',
                    validation:{
                        required:false
                    },
                    valid:true
                }
        },
        formIsValid:false
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
            price : this.props.price,
            orderData : formData
        }

        this.props.onOrderSubmittion(order);

        // axios.post('orders.json',order)
        //     .then((res)=>{
        //         this.setState({loading:false});
        //         this.props.history.push('/');
        //     }).catch(err=>{
        //         this.setState({loading:false});
        //     });
    }

    checkValidity= (value,rules)=>{
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >=rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <=rules.maxLength && isValid;
        }
        //console.log(isValid);
        return isValid;
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
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({
            orderForm:updatedOrderForm,
            formIsValid:formIsValid
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
                               invalid={!formElement.config.valid}
                               shouldValidate={formElement.config.validation}
                               touched={formElement.config.touched}
                               errorMessage={formElement.config.errorMessage}
                               key={formElement.id} />
                    ))
                    }

                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
        );

        if(this.props.loading){
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

const mapStateToProps = state => {
    return{
        ingrediants : state.burgerBuilder.ingrediants,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderSubmittion : (orderData)=>dispatch(orderActions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));