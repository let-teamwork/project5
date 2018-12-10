import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import firebase from './firebase'
import axios from 'axios';
import MapWithMarkerClusterer from './MyMapComponent'
import MapComponent from './MapComponent';
import Messages from './Messages'


class Main extends Component {
    constructor() {
        super();
        this.state={
            markerMidPoint: {
                lat:49.8881111,
                lng:-79.899001991
            },
            runDirections:false
        }
    }
    //function that sets markerMidPoint
    getMarkerMidPoint = (marker)=>{
    
        const midLatLng = {};
        midLatLng.lat=marker.latLng.lat();
        midLatLng.lng=marker.latLng.lng();
        console.log(midLatLng)
        this.setState({
            markerMidPoint:midLatLng
        })

    }
    getDirections=(e)=>{
        e.preventDefault();
        this.setState({
            runDirections:true
        })
    }
    render() {
        
        return (
            <div className="main" key="main">
                <button onClick={this.props.handleClickDisplayMessages}>Display Messages</button>
                    {this.props.messagesdisplayed 
                    ? (
                    <Messages 
                    messages={this.props.messages}
                    />   
                    ) : ""
                    }
            
                <header className="header">
                    <h2 className="header__subTitle">Middl.</h2>
                </header>
                <div className="main wrapper">

                
                {
                    // this.state.runDirections !== false ? 
                    // <MapComponent 
                    //     userCoordinatesLat = {
                    //         this.props.userCoordinates.lat
                    //     }
                    //     userCoordinatesLng = {
                    //         this.props.userCoordinates.lng
                    //     }
                    //     />
                    //     :
                    //     null
                }
                {
                    // this.state.markerMidPoint === {}? 
                    // <form action="">
                    //     <label 
                    //         htmlFor = "main__getDirections"
                    //         onSubmit ={this.getDirections} >
                    //             <input 
                    //                 id="main__getDirections"
                    //                 type="submit"
                    //                 />
                    //     </label>
                    // </form>
                    // :
                    // null
    
                }
    
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
                                <input name="userMOT" type="radio" value="walk" id="walkUser" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">
                                <label htmlFor="bikeUser">By Bike</label>
                                <input name="userMOT" type="radio" value="bike" id="bikeUser" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                             <div className="mainForm__inputLabel--column">
                                 <label htmlFor="carUser">By Car</label>
                                <input name="userMOT" type="radio" value="car" id="carUser" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                            <div className="mainForm__inputLabel--column">
                                <label htmlFor="publicUser"> Public Transport</label>
                                <input name="userMOT" type="radio" value="public" id="publicUser" onChange={this.props.handleMOTChange}/>
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
                                <input name="secondMOT" type="radio" value="walk" id="walkSecond" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="bikeSecond">By Bike</label>
                                <input name="secondMOT" type="radio" value="bike" id="bikeSecond" onChange={this.props.handleMOTChange}/>
                            </div>
                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="carSecond">By Car</label>
                                <input name="secondMOT" type="radio" value="car" id="carSecond" onChange={this.props.handleMOTChange}/>
                            </div>

                            <div className="mainForm__inputLabel--column">   
                                <label htmlFor="publicSecond">Public Transport</label>
                                <input name="secondMOT" type="radio" value="public" id="publicSecond" onChange={this.props.handleMOTChange}/>
                            </div>
                            
                           
                            </div>
                        </form>
                        <button onClick={this.props.handleClick} className="app__button">Middl. Me</button>
                    <MapWithMarkerClusterer
                        getMarkerMidPoint = {
                            this.getMarkerMidPoint
                        }
                        markers = {
                            this.props.markers
                        }
                        runDirections={this.state.runDirections}
                    />
                    {/* this ternary statement will call directions on mymapcomponent */}
                    {
                        this.state.markerMidPoint.lat  
                        ?
                        
                            <button
                            onClick = {
                                this.getDirections
                            } > Need Diretions ? </button> 
                        : 
                            null
                    
                    }
                   
                   
                   
                   
                    <div className="main__button--displayFlex">
                        <button className="main__button" key="main-button1" onClick={this.props.toggleCoffee} value={this.props.showingCoffee}>{this.props.showingCoffee ? <p>Hide Coffee</p> : <p>Show Coffee</p>}</button>
                        <button key="main-button2" className="main__button" onClick={this.props.toggleBar}>{this.props.showingBar ? <p>Hide Bar</p> : <p>Show Bar</p>}</button>
                    </div>
                    
                    {this.props.secondLocationBelongsToUser != false
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
                        return (<div className="main__displayResults wrapper" key={`div-${coffeeShop.alias}`}>
                            <p className="main__displayResults--title">{coffeeShop.alias}</p>
                            <p className="main__displayResults--number">{coffeeShop.display_phone}</p>
                            <img className="main__displayResults--picture" src={coffeeShop.image_url} alt=""/>
                        </div>
                        )
                    })) : (null)}
                    {this.props.showingBar ? (this.props.bar.map(barShop => {
                        return (<div className="main__displayResults wrapper" key={`div-${barShop.alias}`}>
                            <p className="main__displayResults--title">{barShop.alias}</p>
                            <p className="main__displayResults--number">{barShop.display_phone}</p>
                            <img className="main__displayResults--picture" src={barShop.image_url} alt=""/>
                        </div>
                        )
                    })) : (null)}
                    
                </div>

            </div>
        )
    }
}

export default Main