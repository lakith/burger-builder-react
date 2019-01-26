import React from 'react';

import classes from './Input.css'

const input = (props) =>{

    let inputElement = null;

    let inputClasses = [classes.InputElementStyle];
    let validationError = null;
     if(props.invalid && props.shouldValidate && props.touched){
         inputClasses.push(classes.Invalid);
         validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
     }

    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} 
                                            {...props.elementConfig}
                                            value={props.value}
                                            onChange={props.changed}
                                            />
                            
                                            

            break;
        case('textArea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                                               {...props.elementConfig}
                                               value={props.value}
                                               onChange={props.changed}
                                               />
            break;
        case('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(obj=>(
                        <option 
                            key={obj.value}
                            value={obj.value}
                            >{obj.displayValue}</option>
                    ))}
                </select>
            )
            break;   
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;