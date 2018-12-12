import React, { Component } from 'react';
import axios from 'axios';
import MapWithMarkerClusterer from './MyMapComponent'
import Messages from './messages'


class FindInvite extends Component {
    constructor() {
        super();
        this.state = {
            markerMidPoint: {
                X: 43.65141,
                Y: -79.39705
            },
            runDirections: false,
            travelMode: "car",
            distance: "",
            duration: "",
            markers: [{
                alias: "icha-tea-toronto-3",
                coordinates:{
                    latitude: 43.6514148332391,
                    longitude: -79.3970539190491
                },
                display_phone: "+1 416-546-6292",
                distance: 737.0915855323576,
                id: "z1jWE9gO4ehWJESM_H7zpA",
                image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/Z9VnHa_rSad76Bah8lq9Bg/o.jpg",
                is_closed: false,
                name: "Icha Tea",
                phone: "+14165466292",
                price: "$$",
                rating: 4,
                review_count: 127,
                url: "https://www.yelp.com/biz/icha-tea-toronto-3?adjust_creative=fT5P9TcxpP0FwFnSf6Ue6g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=fT5P9TcxpP0FwFnSf6Ue6g"
            }],
            userCoordinates: {}
        }
    }

    getCoordinates(addressInput, callback) {
        const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
        const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?";

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
                const coordinates = response.data.results[0].geometry.location;
                callback(coordinates);
            })
    }

    setUserCoordinates = (coordinates) => {
        const newObject = {};
        newObject.lat = coordinates.lat;
        newObject.lng = coordinates.lng;
        this.setState({
            userCoordinates: newObject
        }, () => {
            this.setTheCoordinates(this.state.userCoordinates.lat, this.state.userCoordinates.lng)
        });
    }

    run = () => {
        this.getCoordinates(this.props.userLocation, this.setUserCoordinates)
    }
    
    setTheCoordinates=(userlat , userlng)=>{
        this.setState({
            userCoordinates: {
                lat: userlat,
                lng: userlng
            }
        })
        this.getMarkerMidPoint(this.state.markerMidPoint)

    }
    getMarkerMidPoint = (marker) => {

        const midLatLng = {};
        const latString = Math.floor(marker.X.toFixed(5) * 10000);
        const lngString = Math.floor(marker.Y.toFixed(5) * 10000);
        midLatLng.lat = parseFloat(latString);
        midLatLng.lng = parseFloat(lngString);
        this.setState({
            markerMidPoint: midLatLng,
        }, () => {
            this.getSelectedInfo()
        })

    }
    
    getSelectedInfo=()=>{
        const array=this.state.markers;
            const resultArray = array.filter(latLng => {
                const long= Math.floor(latLng.coordinates.longitude.toFixed(5) * 10000);
                const lat = Math.floor(latLng.coordinates.latitude.toFixed(5) * 10000);
                    return (lat == this.state.markerMidPoint.lat && long == this.state.markerMidPoint.lng)
        }) 
            return(<div className="main__displayResults wrapper" key={`div-${resultArray[0].alias}`}>
                <p className="main__displayResults--title">{resultArray[0].name}</p>
                <p className="main__displayResults--number">{resultArray[0].display_phone}</p>
                <img className="main__displayResults--picture" src={resultArray[0].image_url} alt=""/>
            </div>
        )
    }
    render() {
        
        return (
            <div className="main" key="main">
                <button className="app__button" onClick={this.props.handleClickDisplayMessages}>Display Messages</button>
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
                <button onClick={this.run}>Show Your Invite</button>
                <div className="main wrapper">
                    <h3 key="main-h2" className="main__h3">Your date is located here</h3>
                    
                    <MapWithMarkerClusterer
                        getInfoFromDirections = {this.getInfoFromDirections}
                        getMarkerMidPoint = {this.getMarkerMidPoint}
                        markerMidPoint={this.state.markerMidPoint}
                        userCoordinatesLat = {this.props.userCoordinatesLat}
                        userCoordinatesLng = {this.props.userCoordinatesLng}
                        markers = {this.state.markers}
                        runDirections={this.state.runDirections}
                        userMOT = {this.props.userMOT}
                    />
                    {this.state.markerMidPoint.lat ?
                        this.getSelectedInfo() : null
                    }
                </div>
            </div>
        )
    }
}

export default FindInvite