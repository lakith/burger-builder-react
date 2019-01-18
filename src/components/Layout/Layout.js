 import React,{Component} from 'react';
 import Auxiliary from '../../hoc/Auxiliary';
 import Classes from '../Layout/Layout.css';
 import Toolbar from '../Navigation/Toolbar/Toolbar'
 import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

 class Layout extends Component{

    state ={
        showSideDrawer:false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerOpenHandler = () =>{
        this.setState((previousState)=>{
            return{showSideDrawer: !previousState.showSideDrawer}
        })
    }

    render(){
        return(
            <Auxiliary>
                <Toolbar toggle={this.sideDrawerOpenHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className = {Classes.Content}>
                    {this.props.children}
                </main>

            </Auxiliary>
        )
    }
 }

export default Layout;