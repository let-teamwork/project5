import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase'
import axios from 'axios';
import Qs from 'qs';


const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?"


class App extends Component {
  constructor() {
    super()
    this.state = {
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
    const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
    const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?";
    //API CALL FOR GEOCODE DATA
    axios({
      method: "GET",
      url: urlGeoCode,
      dataResponse: "json",
      params: {
        key: geocodeKey,
        address: "1600 Amphitheatre Parkway, Mountain View"
      }
    }).then(response => {
      console.log("I worked", response.data.results[0].geometry.location);
    });
    
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
    // this.getCoordinates()
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


  // setSecondCoordinates = (coordinates, state) => {
  //   const newObject = {};
  //   newObject.lat = coordinates.lat;
  //   newObject.lng = coordinates.lng;
  //   console.log('new', newObject);
  //   this.setState({
  //     state: userLocation
  //   });
  // }

  // console.log('state', this.state.userCoordinates);


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
      }
    )
  }

  handleClick = () => {
    this.getCoordinates(this.state.userLocation, this.setUserCoordinates);
    this.getCoordinates(this.state.secondLocation, this.setSecondCoordinates);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Get User and Second Coordinates</button>
      </div>
    );
  }
}

export default App;

