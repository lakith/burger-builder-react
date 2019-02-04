 import React,{Component} from 'react';
 import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
 import Classes from '../Layout/Layout.css';
 import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
 import {connect} from 'react-redux'
 import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
                <Toolbar
                 isAuth = {this.props.isAuthenticated} 
                 toggle={this.sideDrawerOpenHandler} />
                <SideDrawer
                 isAuth = {this.props.isAuthenticated} 
                 open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className = {Classes.Content}>
                    {this.props.children}
                </main>

            </Auxiliary>
        )
    }
 }

 const mapStateToProps = state => {
     return {
         isAuthenticated : state.auth.token !== null 
     }
 }

export default connect(mapStateToProps,null) (Layout);