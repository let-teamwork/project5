import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';



class CreateAccount extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="createAccount">
        <div className="header__background">
          <header className="createAccount__header wrapper">
            <p className="header__userName">{`Hey
                ${
                  this.props.user.displayName
                }
              `}</p>
          </header>
          </div>
          <div className="createAccount__background wrapper">
            <h2 className="createAccount__subtitle">Middl.</h2>
              <p className="createAccount__text">
                Welcome! You're only a few steps away before finding a perfect destination for your date. This app will find the exact <strong>Middl</strong> point between you and your date! It will then populate several destinations for your upcoming date!
              </p>
            <main>
              <form onSubmit={this.props.handleSubmit}
                  className="createAccount__form"
              >
                  <label htmlFor="userNameForm" 
                    className="createAccount__label"
                  >User name </label>
                <input 
                
                  className="app__input"
                  type="text"
                  id="userNameForm"
                  onChange={this.props.handleChange}
                  value={this.props.userNameForm}
                />
                <label 
                  className = "createAccount__label"
                htmlFor="userLocationForm">Address
                   
                </label>
                <p className="createAccount__text createAccount__text--address"> Please type in your address.This will be your
                default address. </p>
                <input
                  className="app__input"
                  type="text"
                  id="userLocationForm"
                  onChange={this.props.handleChange}
                  value={this.props.userLocationForm}
                />
                <div>
                  <input 
                    type="radio"
                    name="modeOfTransportation"
                  />
                  <input
                    type="radio"
                    name="modeOfTransportation"
                  />
                  <input
                    type="radio"
                    name="modeOfTransportation"
                  />
                  <input
                    type="radio"
                    name="modeOfTransportation"
                  />
                </div>
                <label htmlFor ="createAccount__submit" className="visuallyhidden"> submit address </label>
                  <input
                    className="createAccount__submit app__button"
                    type="submit"
                    value="Submit Address"
                  />
              </form>
            </main>
          </div>
      </div>
    )
  }
}

export default CreateAccount;