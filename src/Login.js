import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'

class Login extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div className="Login">
        <h1>Meet Me Halfway</h1>
        {(this.props.user) ?
          <button onClick={this.props.logOut}>Logout</button>
          : (
            <div>
              <button onClick={this.props.logIn}>Sign In</button>
              <button>Sign In as Guest</button>
            </div>
          )}
        
      </div>
    )
  }
}

export default Login
