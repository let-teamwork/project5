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
          <h1 className="login__title">Middl.</h1>
          <h2 className="login__subtitle">I'll meet you in the middle!</h2>
          {(this.props.user) ?
            <button className="login__logOut app__button" onClick={this.props.logOut}>Logout</button>
            : (
              <div>
                <button onClick={this.props.logIn} className="login__signIn app__button">Sign In</button>
                  <Link to = "/Main" className="app__button" > Sign In as Guest </Link>
              </div>
            )}
              </div>
      </div>
    )
  }
}





export default Login
