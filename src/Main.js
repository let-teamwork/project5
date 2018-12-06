import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import MyMapComponent from './MyMapComponent';


class Main extends Component {
    constructor() {
        super();
        this.setState={
            isMarkerShown: false,
        }
    }
    componentDidMount(){
        this.delayedShowMarker()
    }

    delayedShowMarker = ()=>{
        setTimeout(()=>{
            this.setState({isMarkerShown:true})
        }, 3000)
    }
    handleMarkerClick = () => {
        this.setState({
            isMarkerShown: false
        })
        this.delayedShowMarker()
    }
    render() {
        return (
            <div className="Main">
                <MyMapComponent
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                />
            
            </div>
        )
    }
}

export default Main