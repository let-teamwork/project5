import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase'
import axios from 'axios';
import Qs from 'qs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from "./Login";
import CreateAccount from './CreateAccount'

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?"


class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      coffee:[],
      bar:[],
      midPointCoordinates: {
        lat: null,
        lng: null
      }, 
      userLocation: "278 King St W.",
      secondLocation: "438 King St W.",
      userCoordinates: {},
      secondCoordinates: {}
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
    console.log("Handle submit works", this.state.userLocation)
    const userAddress = this.state.userLocation
    
    const dbRef = firebase.database().ref(`/${this.state.user.uid}`);
    dbRef.push(userAddress);

    this.setState ({
      userLocation: userAddress
    })
  }

  restaurantResults = (lat, lng) => {
    const urlYelp = "https://api.yelp.com/v3/businesses/search";
    const yelpKey =
      "Bearer xH8QyqRzL7E-yuvI5Cq167iWbxZB7jLOCCHukA-TNZoUtALNKXcmYF-0pgqwwUuDiqibPZ_bfIgpYLz0WWrG6SHARQnLEeudmtJ0pZo-PxRvqIaA5aq14eL-n74FXHYx";
    //API CALL FOR YELP DATA
    axios({
      method: "GET",
      url: "http://proxy.hackeryou.com",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: urlYelp,
        params: {
          // location: "toronto",
          radius: 1000,
          categories: "coffee,bars",
          latitude: lat,
          longitude: lng
        },
        proxyHeaders: {
          Authorization: yelpKey
        },
        xmlToJSON: false
      }
    }).then(res => {
      const shopInfo = res.data.businesses
      const coffeeArray = []
      const barArray = []
      shopInfo.forEach((business) => {
        business.categories.forEach((alias) => {
          if (alias.alias === "coffee" || alias.title === "Coffee & Tea") {
            coffeeArray.push(business)
          } else if (alias.alias === "bars" || alias.alias === "pubs") {
            barArray.push(business)
          }
        })
      })
      this.setState({
        coffee: coffeeArray,
        bar: barArray
      })
    });
  };
  

  setUserCoordinates = (coordinates) => {
    if (!this.state.userCoordinates.lat) {
      const newObject = {};
      newObject.lat = coordinates.lat;
      newObject.lng = coordinates.lng;
      console.log('new', newObject);
      this.setState({
        userCoordinates: newObject
      });
      console.log('state', this.state.userCoordinates);
    }
  }

  setSecondCoordinates = (coordinates) => {
    if (!this.state.secondCoordinates.lat) {
      const newObject = {};
      newObject.lat = coordinates.lat;
      newObject.lng = coordinates.lng;
      console.log('new', newObject);
      this.setState({
        secondCoordinates: newObject
      });
      this.midPoint();
      this.restaurantResults(this.state.midPointCoordinates.lat, this.state.midPointCoordinates.lng);
    };
  }

  //API CALL FOR GEOCODE DATA
  getCoordinates(addressInput, callback){
    axios({
      method: "GET",
      url: urlGeoCode,
      dataResponse: "json",
      params: {
        key: geocodeKey,
        address: addressInput
      }
    }).then(
      (response) => {
        console.log('res', response.data.results[0].geometry.location);
        const coordinates = response.data.results[0].geometry.location;
        callback(coordinates);
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleClick = () => {
    this.getCoordinates(this.state.userLocation, this.setUserCoordinates);
    this.getCoordinates(this.state.secondLocation, this.setSecondCoordinates);
  }
  midPoint = () => {
    const midY = (this.state.secondCoordinates.lat + this.state.userCoordinates.lat) / 2;
    const midX = (this.state.secondCoordinates.lng + this.state.userCoordinates.lng) / 2;
    const midObj = {};
    midObj.lat = midY
    midObj.lng = midX
    this.setState({
      midPointCoordinates: midObj
    });
  }


  render() {
    return (
      <Router>
        <div className="App">
        <Route 
          path="/" 
          render={(props) => (
          <Login {...props} 
          user={this.state.user}
          logOut={this.logOut}
          logIn={this.logIn}
          userLocation={this.state.userLocation}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          />
        )}/>
        <Route 
          path="/CreateAccount/" 
          render={(props) => (
          <CreateAccount {...props} 
          user={this.state.user}
          userLocation={this.state.userLocation}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          />
        )}/>
          <button onClick={this.handleClick}>Get User and Second Coordinates</button>
        </div>
      </Router>
    );
  }
}

export default App;

