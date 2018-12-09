import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import MapWithMarkerClusterer from './MyMapComponent';
import Messages from './Messages';  


class Main extends Component {
    constructor() {
        super();
        this.state={
        }
    }
    render() {
        
        return (
            <div key="main" className="Main">
                <MapWithMarkerClusterer
                    markers={this.props.markers}
                />
            
                
                <h2 key="main-h2" >Im the main</h2>
                <button onClick={this.props.handleClickDisplayMessages}>Display Messages</button>
                {this.props.messagesdisplayed 
                ? (
                <Messages 
                messages={this.props.messages}
                />   
                ) : ""
                
                }
                <p key="main-p1" >{`User Coordinates: ${this.props.userCoordinates.lat},${this.props.userCoordinates.lng}`}</p>
                <p key="main-p2" >{`Date Coordinates: ${this.props.secondCoordinates.lat},${this.props.secondCoordinates.lng}`}</p>
                <form key="main-form" >
                    <input type="text" value={this.props.userLocation} id="userLocation" onChange={this.props.handleChange} />
                    <label htmlFor="walkUser">Walking</label>
                    <input name="userMOT" type="radio" value="walk" id="walkUser" onChange={this.props.handleMOTChange}/>
                    <label htmlFor="bikeUser">By Bike</label>
                    <input name="userMOT" type="radio" value="bike" id="bikeUser" onChange={this.props.handleMOTChange}/>
                    <label htmlFor="carUser">By Car</label>
                    <input name="userMOT" type="radio" value="car" id="carUser" onChange={this.props.handleMOTChange}/>
                    <label htmlFor="publicUser">Public Transport</label>
                    <input name="userMOT" type="radio" value="public" id="publicUser" onChange={this.props.handleMOTChange}/>
                    <input type="text" val={this.props.secondLocation}  onChange={this.props.handleAddressChange} id="search" />
                    <label htmlFor="walkSecond">Walking</label>
                    <input name="secondMOT" type="radio" value="walk" id="walkSecond" onChange={this.props.handleMOTChange}/>
                    <label htmlFor="bikeSecond">By Bike</label>
                    <input name="secondMOT" type="radio" value="bike" id="bikeSecond" onChange={this.props.handleMOTChange}/>
                    <label htmlFor="carSecond">By Car</label>
                    <input name="secondMOT" type="radio" value="car" id="carSecond" onChange={this.props.handleMOTChange}/>
                    <label htmlFor="publicSecond">Public Transport</label>
                    <input name="secondMOT" type="radio" value="public" id="publicSecond" onChange={this.props.handleMOTChange}/>
                    <button onClick={this.props.handleClick}>Get User and Second Coordinates</button>
                </form>
                <p key="main-p3" >{`Midpoint: ${this.props.midPoint.lat},${this.props.midPoint.lng}`}</p>
                <button key="main-button1" onClick={this.props.toggleCoffee}value={this.props.showingCoffee}>{this.props.showingCoffee ? <p>Hide Coffee</p> : <p>Show Coffee</p>}</button>
                <button key="main-button2" onClick={this.props.toggleBar}>{this.props.showingBar ? <p>Hide Bar</p> : <p>Show Bar</p>}</button>
                {this.props.secondLocationBelongsToUser
                ? (
                    <div key="main-div1">
                        <form onSubmit={this.props.handleSendMessage}action="">
                                <input onChange={this.props.handleChange} type="text" id="newMessageContent"  />
                            <button>Send Message</button>
                        </form>
                    </div>
                ) : (
                    ""
                )}

                {this.props.showingCoffee ? (this.props.coffee.map(coffeeShop => {
                    return (<div key={`div-${coffeeShop.alias}`}>
                        <p>{coffeeShop.alias}</p>
                        <p>{coffeeShop.display_phone}</p>
                        <img src={coffeeShop.image_url} alt=""/>
                    </div>
                    )
                })) : (null)}
                {this.props.showingBar ? (this.props.bar.map(barShop => {
                    return (<div key={`div-${barShop.alias}`}>
                        <p>{barShop.alias}</p>
                        <p>{barShop.display_phone}</p>
                        <img src={barShop.image_url} alt=""/>
                    </div>
                    )
                })) : (null)}
                
            </div>
        )
    }
}

export default Main