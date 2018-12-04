import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase'
import axios from 'axios';
import Qs from 'qs';



class App extends Component {
  constructor() {
    super()
    this.state = {
      restaurants: []
    }
  }
  componentDidMount() {
    const urlYelp = "https://api.yelp.com/v3/businesses/search";
    const yelpKey = "Bearer xH8QyqRzL7E-yuvI5Cq167iWbxZB7jLOCCHukA-TNZoUtALNKXcmYF-0pgqwwUuDiqibPZ_bfIgpYLz0WWrG6SHARQnLEeudmtJ0pZo-PxRvqIaA5aq14eL-n74FXHYx";
    const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
    const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?"


    //API CALL FOR YELP DATA
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: urlYelp,
        params: {
          location: 'toronto'
        },
        proxyHeaders: {
          'Authorization': yelpKey,
        },
        xmlToJSON: false
      }
    }).then((res) => {
      console.log(res);
    });

    //API CALL FOR GEOCODE DATA
    axios({
      method: "GET",
      url: urlGeoCode,
      dataResponse: "json",
      params: {
        key: geocodeKey,
        address: "1600 Amphitheatre Parkway, Mountain View"
      }
    }).then(
      (response) => {
        console.log("I worked", response.data.results[0].geometry.location);
      }
    )
  }

  render() {
    return (
      <div className="App">
        {console.log("heyy")}
      </div>
    );
  }
}

export default App;

