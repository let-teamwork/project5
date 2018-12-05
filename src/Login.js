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
        {(this.props.user) ? (
          <main>
            <div>
              {(this.props.userLocation) ? (
                <p>Your current address is {this.props.userLocation}</p>
              ) : (
                  <p>Please type in your address. This will be your default address.</p>
                )}
            </div>
            <form onSubmit={this.props.handleSubmit}>
              <input
                type="text"
                id="userLocation"
                onChange={this.props.handleChange}
              />
              <input
                type="submit"
                value="Submit Address"
              />
            </form>
          </main>
        ) : (
            <main>
              <p>You must be logged in to see the form</p>
            </main>
          )}
      </div>
    )
  }
}

export default Login
