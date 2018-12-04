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
      restaurants: [],
      userLocation: null,
      secondLocation: null
    }
  }
  componentDidMount() {
    const urlYelp = "https://api.yelp.com/v3/businesses/search";
    const yelpKey = "Bearer xH8QyqRzL7E-yuvI5Cq167iWbxZB7jLOCCHukA-TNZoUtALNKXcmYF-0pgqwwUuDiqibPZ_bfIgpYLz0WWrG6SHARQnLEeudmtJ0pZo-PxRvqIaA5aq14eL-n74FXHYx";
    


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

    // this.getCoordinates()
  }
  

  


  //API CALL FOR GEOCODE DATA
  getCoordinates(addressInput){
    // const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
    // const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?"
    axios({
      method: "GET",
      url: urlGeoCode,
      dataResponse: "json",
      params: {
        key: geocodeKey,
        address: address
      }
    }).then(
      (response) => {
        const coordinates = response.data.results[0].geometry.location;
        if (this.state.userLocation === null){
          this.setState({
            userLocation: coordinates
          })
        }else{
          this.setState({
            secondLocation: coordinates
          })
        }
      }
    )
  }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;

