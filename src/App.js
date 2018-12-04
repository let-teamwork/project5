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
  omponentDidMount() {
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
          categories: "coffee,bar",
          latitude: lat,
          longitude: lng

        },
        proxyHeaders: {
          Authorization: yelpKey
        },
        xmlToJSON: false
      }
    }).then(res => {
      console.log(res);
    });

    
  }
  

  setUserCoordinants = (coordinates) => {
    // if (this.state.userCoordinates === {}) {
      const newObject = {};
      newObject.lat = coordinates.lat;
      newObject.lng = coordinates.lng;
      console.log('new', newObject);
      this.setState({
        userCoordinates: newObject
      });
      console.log('state', this.state.userCoordintates);
    // }
  }

  setSecondCoordinants = (coordinates) => {
    // if (this.state.secondCoordinates === {}) {
      const newObject = {};
      newObject.lat = coordinates.lat;
      newObject.lng = coordinates.lng;
      console.log('new', newObject);
      this.setState({
        secondCoordinats: newObject
      });
      console.log('state', this.state.secondCoordintates);
    // };
  }


  // setSecondCoordinants = (coordinates, state) => {
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
        // this.setStateCoordinants(coordinates, "secondCoordinates");
        // if (this.state.userLocation === null){
        //   this.setState({
        //     userLocation: coordinates
        //   })
        // }else{
        //   this.setState({
        //     secondLocation: coordinates
        //   })
        // }
      }
    )
  }

  handleClick = () => {
    this.getCoordinates(this.state.userLocation, this.setUserCoordinants);
    this.getCoordinates(this.state.secondLocation, this.setSecondCoordinants);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handleClick}>Fetch</button>
      </div>
    );
  }
}

export default App;

