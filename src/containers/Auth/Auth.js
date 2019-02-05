import React,{Component} from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as authActions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {checkValidity} from '../../shared/utility'

class Auth extends Component {

    state = {
        controls : {
            email:{
                elementType:"input",
                elementConfig :{
                    type:'email',
                    placeholder: 'Your email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail : true
                },
                valid:false,
                touched:false,
                errorMessage:"Please Enter a valid Email"
            },
            password:{
                elementType:"input",
                elementConfig :{
                    type:'password',
                    placeholder: 'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength : 6
                },
                valid:false,
                touched:false,
                errorMessage:"Please Enter a valid Password"
            }
        },
        isSignUp:true
    }

    // checkValidity(value, rules) {
    //     let isValid = true;
    //     if (!rules) {
    //         return true;
    //     }
        
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }

    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }

    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     return isValid;
    // }

    changeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }
    
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp : !prevState.isSignUp}
        });
    }

    componentDidMount() {
        
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRidirectPath();
        }

    }


    render () {

        let formElementsArray=[];

        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        

        let formInputs = formElementsArray.map(formElement => (
            <Input  elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event)=>this.changeHandler(event,formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    key={formElement.id} />
                    
        ));

        if(this.props.loading) {
            formInputs = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage  = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;



        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
           
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formInputs}
                    <Button btnType="Success">Submit</Button>
                </form>
                    <Button btnType="Danger"
                        clicked = {this.switchAuthModeHandler}
                    >Switch To {this.state.isSignUp ? "Sign In": "Sign Up"}</Button>
            </div>
        );
    }
}

const mapStateToPRops = (state) => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(authActions.auth(email,password,isSignUp)),
        onSetAuthRidirectPath: () => dispatch(authActions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToPRops , mapDispatchToProps) (Auth)