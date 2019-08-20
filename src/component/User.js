import React, { Component } from 'react';
import SignUp from './SignUp'
import Login from './Login'

class User extends Component{
    render(){
        return (
            <div>
            <Login handle={this.props.handle} email={this.props.email} password={this.props.password}/>
            {/* <SignUp handle={this.props.handle} email={this.props.email} password={this.props.password}/> */}
            </div>
        )
    }
}

export default User