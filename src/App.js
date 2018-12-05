import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase'
import axios from 'axios';
import Qs from 'qs';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?"


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

      shopInfo.map((business) => {
        business.categories.map((alias) => {
          console.log(alias)
          if (alias.alias === "coffee" || alias.title === "Coffee & Tea") {
            this.state.restaurants.coffee.push(business)
          } else if (alias.alias === "bars" || alias.alias === "pubs") {
            this.state.restaurants.bar.push(business)
          }
        })
      })
    });
  }
  

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
      console.log('state', this.state.secondCoordinates);
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
        <button onClick={this.handleClick}>Get User and Second Coordinates</button>
      </div>
    );
  }
}

export default App;

