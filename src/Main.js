import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';

class Main extends Component {
    constructor() {
        super()
    }
    
    //-------------------------------------------
    //Create inputs to change the addresses: 
        //Change address of user (change the state of user location and thus user coordinates)
        //Change address of second coordinates.
    //You need basically like two input fields that will help you run this situation

    //-------------------------------------------

    render() {
        
        return (
            <div className="Main">
                
                <h2>Im the main</h2>
                
                <p>{`User Coordinates: ${this.props.userCoordinates.lat},${this.props.userCoordinates.lng}`}</p>
                <p>{`Date Coordinates: ${this.props.secondCoordinates.lat},${this.props.secondCoordinates.lng}`}</p>
                <form>
                    <input type="text" value={this.props.userLocation} id="userLocation" onChange={this.props.handleAddressChange} />
                    <input type="text" val={this.props.secondLocation}  onChange={this.props.handleAddressChange} id="search" />
                    <button onClick={this.props.handleClick}>Get User and Second Coordinates</button>
                </form>
                <p>{`Midpoint: ${this.props.midPoint.lat},${this.props.midPoint.lng}`}</p>
                <button onClick={this.props.toggleCoffee}value={this.props.showingCoffee}>{this.props.showingCoffee ? <p>Hide Coffee</p> : <p>Show Coffee</p>}</button>
                <button onClick={this.props.toggleBar}>{this.props.showingBar ? <p>Hide Bar</p> : <p>Show Bar</p>}</button>
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