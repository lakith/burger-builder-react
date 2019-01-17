import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component {

    state = {
        ingrediants : {
            cheese : 0,
            salad : 0,
            bacon : 0,
            meat : 0
        }
    }

    render() {
        return (
            <Auxiliary>
                <Burger ingrediants = {this.state.ingrediants} />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;