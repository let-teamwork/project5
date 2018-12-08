import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import MapWithMarkerClusterer from './MyMapComponent';


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
            
                
                <h2>Im the main</h2>
                
                <p>{`User Coordinates: ${this.props.userCoordinates.lat},${this.props.userCoordinates.lng}`}</p>
                <p>{`Date Coordinates: ${this.props.secondCoordinates.lat},${this.props.secondCoordinates.lng}`}</p>
                <form>
                    <input type="text" value={this.props.userLocation} id="userLocation" onChange={this.props.handleAddressChange} />
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
                <p>{`Midpoint: ${this.props.midPoint.lat},${this.props.midPoint.lng}`}</p>
                <button onClick={this.props.toggleCoffee}value={this.props.showingCoffee}>{this.props.showingCoffee ? <p>Hide Coffee</p> : <p>Show Coffee</p>}</button>
                <button onClick={this.props.toggleBar}>{this.props.showingBar ? <p>Hide Bar</p> : <p>Show Bar</p>}</button>


                {this.props.secondLocationBelongsToUser
                ? (
                    <div>
                        <form onSubmit={this.props.handleSendMessage}action="">
                                <input onChange={this.props.handleChange} type="text" id="newMessageContent"  />
                            <button>Send Message</button>
                        </form>
                    </div>
                ) : (
                    ""
                )}

                {this.props.showingCoffee ? (this.props.coffee.map(coffeeShop => {
                    return (<div>
                        <p>{coffeeShop.alias}</p>
                        <p>{coffeeShop.display_phone}</p>
                        <img src={coffeeShop.image_url} alt=""/>
                    </div>
                    )
                })) : (null)}
                {this.props.showingBar ? (this.props.bar.map(barShop => {
                    return (<div>
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