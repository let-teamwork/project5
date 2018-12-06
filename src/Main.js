import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';



const googleMapApiKey = "AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo"
const googleMapurl = "https://www.google.com/maps/embed/v1/place "


class Main extends Component {
    constructor() {
        super()
    }
    componentDidMount(){
        axios({
            method: "GET",
            url: googleMapurl,
            dataResponse: "json",
            params: {
                key: googleMapApiKey,
                address: addressInput
            }
        }).then(
            (response) => {
                console.log('res', response.data.results[0].geometry.location);
                const coordinates = response.data.results[0].geometry.location;
                callback(coordinates);
            })
    }
    render() {
        return (
            <div className="Main">
                <iframe width = "600"
                height = "450"
                frameborder = "0"
                style = "border:0"
                src = "https://www.google.com/maps/embed/v1/search?q=1985%20danforth%20ave&key=AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo"
                allowfullscreen></iframe>
            </div>
        )
    }
}

export default Main