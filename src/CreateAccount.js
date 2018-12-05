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
        {this.props.user}

      </div>
    )
  }
}

export default CreateAccount;