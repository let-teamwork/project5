import { Route, Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'

class Login extends Component{
  constructor(){
    super()
  }

  render(){
    if (this.props.toCreateAccount){
      return(
        <Redirect to='/CreateAccount' />
      )
    } 
    if (this.props.toMain){
      return(
        <Redirect to='/Main' />
      )
    }
    return(
      <div className="Login">
        <h1>Meet Me Halfway</h1>
        <h2>Im the login page</h2>
        {(this.props.user) ?
          <button onClick={this.props.logOut}>Logout</button>
          : (
            <div>
              <button onClick={this.props.logIn}>Sign In</button>
              <Link to="/Main">Sign In as Guest</Link>
            </div>
          )}
      </div>
    )
  }
}



export default Login
