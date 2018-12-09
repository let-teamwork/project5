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
        <div className="wrapper"> 
          <h1 className="login__title">Middl.</h1>
          <h2 className="login__subtitle">I'll meet you in the middle!</h2>
          {(this.props.user) ?
            <button className="login__logOut app__button" onClick={this.props.logOut}>Logout</button>
            : (
              <div>
                <button onClick={this.props.logIn} className="login__signIn app__button">Sign In</button>
                <button className="login__signInAsGuest app__button">Sign In as Guest</button>
              </div>
            )}
        </div>
      </div>
    )
  }
}



export default Login
