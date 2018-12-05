import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase'
import axios from 'axios';
import Qs from 'qs';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      restaurants: {
        coffee:[],
        bar:[]
      },
      midPointCoordinates: {
        lat: null,
        lng: null
      }, 
      userLocation: null,
      secondLocation: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState(
          {
            user: user
          },() => {
            this.dbRef = firebase.database().ref(`/${this.state.user.uid}`);
            }
        )
      }
    })

  }

  componentWillUnmount() {
    if(this.dbRef){
      this.dbRef.off();
    }
  }

  logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      this.setState({
        user: result.user
      });
    });
  };

  logOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const dbRef = firebase.database().ref(`/${this.state.user.uid}`);
    console.log("dbRef", dbRef)
    if (dbRef === null) {
      const userAddress = {
        address: this.state.userLocation
      }
      dbRef.push(userAddress);
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  //What's happening right now? Well, when you log in, it's not bringing back old info. and when you type in something new, it's making a new entry. We want to replace it. Not make it new.

  render() {
    console.log("user", this.state.user);
    return (
      <div className="App">
      <h1>Meet Me Halfway</h1>
        {(this.state.user) ?
          <button onClick={this.logOut}>Logout</button>
        :(
        <div>
          <button onClick={this.logIn}>Sign In</button>
          <button>Sign In as Guest</button>
        </div>
        )}
        {(this.state.user) ? (
          <main>
            <div>
              {(this.state.userLocation) ? (
                <p>Your current address is {this.state.userLocation}</p>
              ) : (
                <p>Please type in your address. This will be your default address.</p>
              )}
            </div>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text"
                id="userLocation"
                onChange={this.handleChange}
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
    );
  }
}

export default App;

