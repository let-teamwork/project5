// import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
// import firebase from './firebase'
// import axios from 'axios';
import MapWithMarkerClusterer from './MyMapComponent'
// import MapComponent from './MapComponent';
import Messages from './messages'


class FindInvite extends Component {
    constructor() {
        super();
        this.state={
            markerMidPoint: {
                // lat: 43.65439,
                // lng: -79.42355
            },
            runDirections:false
        }
    }
    //function that sets markerMidPoint
    getMarkerMidPoint = (marker)=>{
        console.log("marker", marker)
        const midLatLng = {};
        const latString = marker.latLng.lat().toFixed(5);
        const lngString = marker.latLng.lng().toFixed(5);
        midLatLng.lat= parseFloat(latString);
        midLatLng.lng= parseFloat(lngString);
        console.log(midLatLng)
        this.setState({
            markerMidPoint:midLatLng,
            travelMode:"",
            distance:"",
            duration:""
        }, ()=>{
            this.getSelectedInfo()
        })

    }
    getInfoFromDirections=(results)=>{
        const travelMode = results.request.origin.travelMode;
        const distance = results.routes[0].legs[0].distance.text;
        const duration = results.routes[0].legs[0].duration.text;
        console.log(travelMode,
            distance,
            duration)
        this.setState({
            travelMode,
            distance,
            duration
        })
    }
    getDirections=(e)=>{
        e.preventDefault();
        this.setState({
            runDirections:true
        })
    }
    getSelectedInfo=()=>{
        const array=this.props.markers;
        console.log("i'm the array",array);
            const resultArray = array.filter(latLng => {
                    return(this.state.markerMidPoint.lat === latLng.coordinates.latitude && this.state.markerMidPoint.lng === latLng.coordinates.longitude)
            }) 
            console.log(resultArray)
            return(<div className="main__displayResults wrapper" key={`div-${resultArray[0].alias}`}>
                <p></p>
                <p className="main__displayResults--title">{resultArray[0].alias}</p>
                <p className="main__displayResults--number">{resultArray[0].display_phone}</p>
                <img className="main__displayResults--picture" src={resultArray[0].image_url} alt=""/>
                <button
                onClick= {
                    this.getDirections
                } > Need Directions ? </button>
            </div>
        )
    }
    render() {
        
        return (
            <div className="main" key="main">
                <button onClick={this.props.handleClickDisplayMessages}>Display Messages</button>
                    {this.props.messagesdisplayed 
                    ? (
                    <Messages 
                    messages={this.props.messages}
                    replyToMessage={this.props.replyToMessage}
                    recieveRestaurantResult={this.props.recieveRestaurantResult}
                    />   
                    ) : ""
                    }
            
                <header className="header">
                    <h2 className="header__subTitle">Middl.</h2>
                </header>
                <div className="main wrapper">
                    <h3 key="main-h2" className="main__h3">Your date is located here</h3>
                    <MapWithMarkerClusterer
                        getInfoFromDirections = {
                            this.getInfoFromDirections
                        }
                        getMarkerMidPoint = {
                            this.getMarkerMidPoint
                        }
                        markerMidPoint={this.state.markerMidPoint}
                        userCoordinatesLat = {
                            this.props.userCoordinatesLat
                        }
                        userCoordinatesLng = {
                            this.props.userCoordinatesLng
                        }
                        markers = {
                            this.props.markers
                        }
                        runDirections={this.state.runDirections}
                        userMOT = {
                            this.props.userMOT
                        }
                    />
                    {/* this ternary statement will call directions on mymapcomponent */}
                    
                    {
                        this.state.markerMidPoint.lat  
                        ?
                        
                            this.getSelectedInfo()
                        : 
                        null
                    }
                </div>

            </div>
        )
    }
}

export default FindInvite