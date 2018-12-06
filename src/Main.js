import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';
import Iframe from 'react-iframe'


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
                q: "City+Hall,Toronto",
            }
        }).then(
            (response) => {
                console.log(response)
            })
    }


    render() {
        return (
            <div className="Main">
<<<<<<< HEAD
                <iframe width = "600"
                height = "450"
                frameborder = "0"
                style = "border:0"
                src = "https://www.google.com/maps/embed/v1/search?q=1985%20danforth%20ave&key=AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo"
                allowfullscreen />
                <p>i'm the main page</p>
=======
                <h2>Im the main</h2>
>>>>>>> af6e4b918b773249d9b094102225ddc04d2ebdd6
            </div>
        )
    }
}

export default Main