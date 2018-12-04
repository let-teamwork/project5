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
    const url = "https://api.yelp.com/v3/businesses/search";
    const apiKey = "Bearer xH8QyqRzL7E-yuvI5Cq167iWbxZB7jLOCCHukA-TNZoUtALNKXcmYF-0pgqwwUuDiqibPZ_bfIgpYLz0WWrG6SHARQnLEeudmtJ0pZo-PxRvqIaA5aq14eL-n74FXHYx";
    axios({
      method: 'GET',
      url: 'http://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: url,
        params: {
          location: 'toronto'
        },
        proxyHeaders: {
          'Authorization': apiKey,
        },
        xmlToJSON: false
      }
    }).then((res) => {
      console.log(res);
    });
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

