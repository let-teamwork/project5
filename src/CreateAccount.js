import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';

class CreateAccount extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <h2>I'm create account</h2>
        <main>
          <div>
            {(this.props.userLocation) ? (<p>Your current address is {this.props.userLocation}</p> 
            ) : (
            <p>Please type in your address. This will be your default address.</p>
            )}
          </div>
          <form onSubmit={this.props.handleSubmit}>
            <input 
              type="text"
              id="userNameForm"
              onChange={this.props.handleChange}
              value={this.props.userNameForm}
            />
            <input
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
              <input
                type="submit"
                value="Submit Address"
              />
          </form>
        </main>
      </div>
    )
  }
}

export default CreateAccount;