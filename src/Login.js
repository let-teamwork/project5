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
      <div className="login">
        <h1 className="login__title">Middl.</h1>
        <h2 className="login__subtitle">Im the login page</h2>
        {(this.props.user) ?
          <button className="login__logout" onClick={this.props.logOut}>Logout</button>
          : (
            <div>
              <button onClick={this.props.logIn} className="login__signIn">Sign In</button>
              <button className="login__signInAsGuest">Sign In as Guest</button>
            </div>
          )}
      </div>
    )
  }
}



export default Login
