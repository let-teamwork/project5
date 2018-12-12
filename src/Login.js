import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

class Login extends Component{
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
          <h1 className="login__title"><span className="login__span--primaryColor">Mid</span><span className="login__span--secondaryColor">dl.</span>  </h1>
          {(this.props.user) ?
            <button className="login__logOut app__button" onClick={this.props.logOut}>Logout</button>
            : (
              <div>
                <button onClick={this.props.logIn} className="login__signIn app__button">Sign In</button>
                  <Link onClick={this.props.signInAsGuest}to = "/Main" className="app__button" > Sign In as Guest </Link>
              </div>
            )}
              </div>
      </div>
    )
  }
}





export default Login
