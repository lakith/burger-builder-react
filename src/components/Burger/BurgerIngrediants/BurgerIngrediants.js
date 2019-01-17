import React,{Component} from 'react';
import Classes from '../BurgerIngrediants/BurgerIngrediants.css';
import PropTypes from 'prop-types'

class  BurgerIngrediants extends Component {

    render(){
        let ingrediant = null;

        switch (this.props.type){
            case('bread-bottom'):
                ingrediant = <div className={Classes.BreadBottom}> </div>;
                break;
            case ('bread-top'):
                ingrediant = (
                    <div className={Classes.BreadTop}>
                        <div className = {Classes.Seeds1}></div>
                        <div className = {Classes.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                    ingrediant = <div className={Classes.Meat}></div>
                    break;
            case('cheese'):
                    ingrediant = <div className={Classes.Cheese}></div>
                    break;
            case('salad'):
                    ingrediant = <div className={Classes.Salad}></div>
                    break;
            case('bacon'):
                    ingrediant = <div className={Classes.Bacon}></div>
                    break;
            default:
                    ingrediant = null;
        }
    
        return ingrediant;
    }
   
    
};

BurgerIngrediants.propTypes = {
    type:PropTypes.string.isRequired
}

export default BurgerIngrediants;