import React, { Component } from 'react';
import './styles/App.css';
import firebase from './firebase'
import axios from 'axios';
import Qs from 'qs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from "./Login";
import CreateAccount from './CreateAccount'
import Main from './Main'
import MapWithMarkerClusterer from './MyMapComponent'

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const geocodeKey = "AIzaSyC7aX88PBTGc5vWZS5P6QTENMfde_Qz194";
const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?"


class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      coffee:[],
      bar:[],
      markers:[],
      midPointCoordinates: {
        lat: null,
        lng: null
      }, 
      userLocation: "",
      userLocationForm: "",
      secondLocation: "",
      userCoordinates: {},
      secondCoordinates: {},
      isGuest: false,
      newUser: true,
      toMain: false,
      toCreateAccount: false ,
      showingCoffee: true,
      showingBar: true,
      userNameForm: "",
      userName: "",
      search: "",
      searchedUser: ""

    }
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      console.log('firing');
      if (user) {
        this.setState(
          {
            user: user,
          },() => {
            this.dbRef = firebase.database().ref(`/${this.state.user.uid}`);
            this.dbRef.on('value', (snapshot) => {
              console.log('here', snapshot.val());
              if (snapshot.val() !== null){
                this.setState({
                  userLocation: (snapshot.val().userAddress),
                  userName: (snapshot.val().userName)
                })
              }
            })
          }
        )
      }
    })
  }

  // componentDidMount(){
  //   firebase.database().ref(`${this.state.user.uid}`).on('value', (snapshot) => {
  //      console.log('here', snapshot.val()); 
  //       this.setState({
  //         userLocation: (snapshot.val().userAddress) || "",
  //         userName: (snapshot.val().userName) || ""
  //       })
  //   })
  // }


  componentWillUnmount() {
    if(this.dbRef){
      this.dbRef.off();
    }
  }

  logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      
      const userObject = Object.assign({}, result.user);
      console.log(userObject);
      this.setState({
        user: userObject
      }
      );
      firebase.database().ref(`${userObject.uid}`).once('value').then((snapshot) => {
        console.log("on login", snapshot.val());
        if(snapshot.exists()) {
          this.setState({
            newUser: false
            // userLocation: (snapshot.val().userAddress),
            // userName: (snapshot.val().userName)
          }, () => {
            this.redirectAfterLogin();
          }
          )
        } else {
          this.redirectAfterLogin();
        }
      });

      
      // console.log(this.state.user);
    })
  }  

  redirectAfterLogin = () => {
    if (this.state.newUser) {
      this.setState({
        toCreateAccount: true
      })
    } else {
      this.setState({
        toMain: true
      })
    }
  }

  logOut = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("Handle submit works", this.state.userLocation)
    const userInfo = {
      userName: this.state.userNameForm,
      userAddress: this.state.userLocationForm
    }
    const dbRef = firebase.database().ref(`/${this.state.user.uid}`);
    dbRef.set(userInfo);
    console.log(dbRef);
    console.log(firebase.database);
    dbRef.once('value').then((snapshot) => {
      this.setState ({
        userLocation: (snapshot.val().userAddress),
        userName: (snapshot.val().userName)
      })
    });


  }

  restaurantResults = (lat, lng) => {
    console.log(lat, lng)
    const urlYelp = "https://api.yelp.com/v3/businesses/search";
    const yelpKey =
      "Bearer xH8QyqRzL7E-yuvI5Cq167iWbxZB7jLOCCHukA-TNZoUtALNKXcmYF-0pgqwwUuDiqibPZ_bfIgpYLz0WWrG6SHARQnLEeudmtJ0pZo-PxRvqIaA5aq14eL-n74FXHYx";
    //API CALL FOR YELP DATA
    axios({
      method: "GET",
      url: "http://proxy.hackeryou.com",
      dataResponse: "json",
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: "brackets" });
      },
      params: {
        reqUrl: urlYelp,
        params: {
          radius: 5000,
          categories: "coffee,bars",
          latitude: lat,
          longitude: lng
        },
        proxyHeaders: {
          Authorization: yelpKey
        },
        xmlToJSON: false
      }
    }).then(res => {
      console.log("I work", res)
      const shopInfo = res.data.businesses
      const coffeeArray = []
      const barArray = []
      shopInfo.forEach((business) => {
        business.categories.forEach((alias) => {
          if (alias.alias === "coffee" || alias.title === "Coffee & Tea") {
            coffeeArray.push(business)
          } else if (alias.alias === "bars" || alias.alias === "pubs") {
            barArray.push(business)
          }
        })
      })
      this.setState({
        coffee: coffeeArray,
        bar: barArray
      })
    });
  };
  
  pushCoffeeAndBarToMarker= ()=>{
    console.log(this.state.bar,this.state.coffee)
    const newMarkersArray = [];
    const coffee = this.state.coffee
    const bar = this.state.bar
    const joinCoffeeToBar = bar.concat(coffee)
    
    this.setState({
      markers:joinCoffeeToBar
    })
    console.log(this.state.markers)
  }

  setUserCoordinates = (coordinates) => {
    const newObject = {};
    newObject.lat = coordinates.lat;
    newObject.lng = coordinates.lng;
    console.log('new', newObject);
    this.setState({
      userCoordinates: newObject
    });
    console.log('state', this.state.userCoordinates);
  }

  setSecondCoordinates = (coordinates) => {
    const newObject = {};
    newObject.lat = coordinates.lat;
    newObject.lng = coordinates.lng;
    console.log('new', newObject);
    this.setState({
      secondCoordinates: newObject
    });
    this.midPoint();
  }

  //API CALL FOR GEOCODE DATA
  getCoordinates(addressInput, callback){
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
        console.log('res', response.data.results[0].geometry.location);
        const coordinates = response.data.results[0].geometry.location;
        callback(coordinates);
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    this.checkForMatchingUsers();

    
  }
  midPoint = () => {
    const midY = (this.state.secondCoordinates.lat + this.state.userCoordinates.lat) / 2;
    const midX = (this.state.secondCoordinates.lng + this.state.userCoordinates.lng) / 2;
    const midObj = {};
    midObj.lat = midY
    midObj.lng = midX
    this.setState({
      midPointCoordinates: midObj
    });
    this.restaurantResults(this.state.midPointCoordinates.lat, this.state.midPointCoordinates.lng)
    setTimeout(this.pushCoffeeAndBarToMarker, 1000);
  }

  toggleCoffee = () => {
    this.setState({
      showingCoffee: !this.state.showingCoffee
    })
  }

  toggleBar = () => {
    this.setState({
      showingBar: !this.state.showingBar
    })
  }

  handleAddressChange = (e) => {
    if (e.target.value) {
      this.setState({
        [e.target.id]: e.target.value
      })
    }
  }
  

  
  checkForMatchingUsers = () => {
    console.log(this.state.search)
    const dbRef = firebase.database().ref();
    console.log(firebase.database);
    
    dbRef.once('value').then((snapshot) => {
      console.log('this is firebase!!~!!')
      console.log(snapshot.val().userName);
      const newArray = Object.values(snapshot.val());
      console.log(newArray);
      newArray.forEach((user) => {
        if(user.userName === this.state.search){
          this.setState({
            secondLocation: user.userAddress
          }, () => {
            console.log(this.state.secondLocation);
            this.getCoordinates(this.state.secondLocation, this.setSecondCoordinates);
          });
        } else {
          this.setState({
            secondLocation: this.state.search
          }, () => {
            this.getCoordinates(this.state.secondLocation, this.setSecondCoordinates);
          })
        }
      })
    })
    this.getCoordinates(this.state.userLocation, this.setUserCoordinates);
  }

  

    
  

  render() {
    return (
      <Router>
        <div className="App">
        <Route 
          exact path="/"
          render={(props) => (
          <Login {...props} 
          user={this.state.user}
          logOut={this.logOut}
          logIn={this.logIn}
          userLocation={this.state.userLocation}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          toCreateAccount={this.state.toCreateAccount}
          toMain={this.state.toMain}
          />
        )}/>
        <Route 
          exact path="/CreateAccount" 
          render={(props) => (
          <CreateAccount {...props} 
          user={this.state.user}
          userLocation={this.state.userLocation}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          userName={this.state.userName}
          />
        )}/>
        <Route 
          exact path="/Main" 
          render={(props) => (
          <Main {...props} 
          user={this.state.user}
          userLocation={this.state.userLocation}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          userCoordinates={this.state.userCoordinates}
          secondCoordinates={this.state.secondCoordinates}
          midPoint={this.state.midPointCoordinates}
          bar={this.state.bar}
          coffee={this.state.coffee}
          showingCoffee={this.state.showingCoffee}
          showingBar={this.state.showingBar}
          toggleCoffee={this.toggleCoffee}
          toggleBar={this.toggleBar}
          handleAddressChange={this.handleAddressChange}
          handleClick={this.handleClick}
          midPointCoordinates={this.state.midPointCoordinates}
          markers={this.state.markers}
          />
          
        )}/>
        </div>
      </Router>
    );
  }
}

export default App;

