import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';
import MapWithMarkerClusterer from './MyMapComponent';
import MapComponent from './MapComponent';
import Messages from './messages';


class Main extends Component {
    constructor() {
        super();
        this.state={
            markerMidPoint: {
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
                {this.props.bothAreUsers ? 
                    (<div>
                    <button onClick={() =>{this.props.showMessageBar(
                        resultArray[0].name,
                        resultArray[0].location.address1,
                        resultArray[0].location.city,
                        resultArray[0].location.state,
                        resultArray[0].location.country,
                        resultArray[0].id
                    )}}>Share with your date</button>
                    {this.props.showMessage ? 
                        <form onSubmit={this.props.handleSendMessage}>
                            <input onChange={this.props.handleChange} type="text" id="newMessageContent"  />
                            <button>Send Message</button>
                        </form>
                    : ""}
                </div>) : ""}
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
                    <h3 key="main-h2" className="main__h3">Please provide the following information</h3>
                    <form key="main-form" className="mainForm" >
                        <label htmlFor=""> 
                            <p className="mainForm__address">Please enter your destination (registered users will have their address loaded automatically) </p>
                            <input type="text" className="app__input" placeholder="" value={this.props.userLocation} id="userLocation" onChange={this.props.handleChange} />
                        </label>
                        <p className="mainForm__mot">Mode of Transportation</p>
                        <div className="mainForm__inputLabel--displayFlex">
                            <div className="mainForm__inputLabel--column">
                                <label htmlFor="walkUser">Walking</label>
                                <input name="userMOT" type="radio" value="walking" id="walkUser" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">
                                <label htmlFor="bikeUser">By Bike</label>
                                <input name="userMOT" type="radio" value="bicycling" id="bikeUser" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                            <div className="mainForm__inputLabel--column">
                                <label htmlFor="carUser">By Car</label>
                                <input name="userMOT" type="radio" value="driving" id="carUser" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                            <div className="mainForm__inputLabel--column">
                                <label htmlFor="publicUser"> Public Transport</label>
                                <input name="userMOT" type="radio" value="transit" id="publicUser" onChange={this.props.handleMOTChange}/>
                            </div>
                        </div>
                        <div className="main__divider"></div>
                        <label htmlFor="">
                            <p className="mainForm__address">enter your date's address or username</p>
                            <input type="text" className="app__input" placeholder="ex.123 Queen St. West" val={this.props.secondLocation}  onChange={this.props.handleAddressChange} id="search" />
                        </label>
                        <p className="form__mot">Mode of Transportation</p>
                        <div className="mainForm__inputLabel--displayFlex">
                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="walkSecond">Walking</label>
                                <input name="secondMOT" type="radio" value="walking" id="walkSecond" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="bikeSecond">By Bike</label>
                                <input name="secondMOT" type="radio" value="bicycling" id="bikeSecond" onChange={this.props.handleMOTChange}/>
                            </div>
                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="carSecond">By Car</label>
                                <input name="secondMOT" type="radio" value="driving" id="carSecond" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="publicSecond">Public Transport</label>
                                <input name="secondMOT" type="radio" value="transit" id="publicSecond" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                           
                            </div>
                        </form>

                        {this.props.inputsFilled ? null : <p>Please fill in all fields</p>}
                        
                        <button onClick={this.props.handleClick} 
                            
                        className="app__button">Middl. Me</button>
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
                   
                    <div className="main__button--displayFlex">
                        <button className="main__button" key="main-button1" onClick={this.props.toggleCoffee} value={this.props.showingCoffee}>{this.props.showingCoffee ? <p>Hide Coffee</p> : <p>Show Coffee</p>}</button>
                        <button key="main-button2" className="main__button" onClick={this.props.toggleBar}>{this.props.showingBar ? <p>Hide Bar</p> : <p>Show Bar</p>}</button>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default Main