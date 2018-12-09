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
const urlGeoCode = "https://maps.googleapis.com/maps/api/geocode/json?";

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
      searchedUser: "",
      searchedUID: "",
      secondLocationBelongsToUser: false,
      secondUserName: "",
      pendingMessages: 0,
      messages: [],
      newMessageContent: "",
      userMOT: "",
      secondMOT: "",
      item: {},
      messagesdisplayed: false
    }
  }

  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      // console.log('firing');
      if (user) {
        this.setState(
          {
            user: user,
          },() => {
            this.dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
            this.dbRef.on('value', (snapshot) => {
              if (snapshot.val() !== null){
                this.setState({
                  userLocation: (snapshot.val().userAddress),
                  userName: (snapshot.val().userName)
                }, () => {
                  this.fetchMessages(); 
                })
              }
            })
          }
        )
      }
    })
    this.fetchMessages();
    // console.log(this.state.messages);
  }

  componentWillUnmount() {
    if(this.dbRef){
      this.dbRef.off();
    }
  }

  logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      
      const userObject = Object.assign({}, result.user);
      this.setState({
        user: userObject
      }
      );
      firebase.database().ref(`/users/${userObject.uid}`).once('value').then((snapshot) => {
        // console.log("on login", snapshot.val());
        if(snapshot.exists()) {
          this.setState({
            newUser: false
          }, () => {
            this.redirectAfterLogin();
          }
          )
        } else {
          this.redirectAfterLogin();
        }
      });
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

  signInAsGuest = () => {
    auth.signInAnonymously();
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
    // console.log("Handle submit works", this.state.userLocation)
    const userInfo = {
      userName: this.state.userNameForm,
      userAddress: this.state.userLocationForm
    }
    const dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
    const dbRefUserList = firebase.database().ref(`/userNames/${this.state.userName}`);
    dbRef.set(userInfo);

    dbRef.once('value').then((snapshot) => {
      this.setState ({
        userLocation: (snapshot.val().userAddress),
        userName: (snapshot.val().userName)
      }, () => {
        dbRefUserList.set(this.state.user.uid);
      })
    });
  }

  restaurantResults = (lat, lng) => {
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
      // console.log("calling Yelp API & retrieving all restaurants:", res)
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
    // console.log("Pushing bars to Bar Array:", this.state.bar) 
    // console.log("Pushing coffee shops to Coffee Array:", this.state.coffee)
    const newMarkersArray = [];
    const coffee = this.state.coffee
    const bar = this.state.bar
    const joinCoffeeToBar = bar.concat(coffee)
    
    this.setState({
      markers:joinCoffeeToBar
    })
    // console.log("Turning Locations into Markers:", this.state.markers)
    // console.log("Complete")
    // console.log("")
  }

  setUserCoordinates = (coordinates) => {
    const newObject = {};
    newObject.lat = coordinates.lat;
    newObject.lng = coordinates.lng;
    this.setState({
      userCoordinates: newObject
    });
  }

  setSecondCoordinates = (coordinates) => {
    const newObject = {};
    newObject.lat = coordinates.lat;
    newObject.lng = coordinates.lng;
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
    this.searchFirebase(this.state.search, "users", this.getCoordinatesRelatedToSearch);
    console.log("Submit clicked as user")
    // if (this.state.userName){
    // }else{
    //   console.log("Submit clicked as guest")
    //   this.getCoordinates(this.state.userLocation, this.setUserCoordinates)
    //   this.getCoordinates(this.state.search, this.setSecondCoordinates)
    // }
  }

  midPointBasedOnMOT = () => {
    // console.log("Coordinates available to find midpoint", this.state.userCoordinates, this.state.secondCoordinates)
    if (this.state.userMOT === "car" && this.state.secondMOT === "walk") {
      //Car-Walk
      this.midY = (this.state.secondCoordinates.lat * 5 / 6) + (this.state.userCoordinates.lat / 6);
      this.midX = (this.state.secondCoordinates.lng * 5 / 6) + (this.state.userCoordinates.lng / 6);
    } else if (this.state.userMOT === "walk" && this.state.secondMOT === "car") {
      //Walk-Car
      this.midY = (this.state.secondCoordinates.lat / 6) + (this.state.userCoordinates.lat * 5 / 6);
      this.midX = (this.state.secondCoordinates.lng / 6) + (this.state.userCoordinates.lng * 5 / 6);
    } else if (this.state.userMOT === "car" && this.state.secondMOT === "public") {
      //Car-Public
      this.midY = (this.state.secondCoordinates.lat * 5 / 8) + (this.state.userCoordinates.lat * 3 / 8);
      this.midX = (this.state.secondCoordinates.lng * 5 / 8) + (this.state.userCoordinates.lng * 3 / 8);
    } else if (this.state.userMOT === "public" && this.state.secondMOT === "car") {
      //Public-Car
      this.midY = (this.state.secondCoordinates.lat * 3 / 8) + (this.state.userCoordinates.lat * 5 / 8);
      this.midX = (this.state.secondCoordinates.lng * 3 / 8) + (this.state.userCoordinates.lng * 5 / 8);
    } else if (this.state.userMOT === "car" && this.state.secondMOT === "bike") {
      //Car-Bike
      this.midY = (this.state.secondCoordinates.lat * 5 / 7) + (this.state.userCoordinates.lat * 2 / 7);
      this.midX = (this.state.secondCoordinates.lng * 5 / 7) + (this.state.userCoordinates.lng * 2 / 7);
    } else if (this.state.userMOT === "bike" && this.state.secondMOT === "car") {
      //Bike-Car
      this.midY = (this.state.secondCoordinates.lat * 2 / 7) + (this.state.userCoordinates.lat * 5 / 7);
      this.midX = (this.state.secondCoordinates.lng * 2 / 7) + (this.state.userCoordinates.lng * 5 / 7);
    } else if (this.state.userMOT === "walk" && this.state.secondMOT === "public") {
      //Walk-Public
      this.midY = (this.state.secondCoordinates.lat / 4) + (this.state.userCoordinates.lat * 3 / 4);
      this.midX = (this.state.secondCoordinates.lng / 4) + (this.state.userCoordinates.lng * 3 / 4);
    } else if (this.state.userMOT === "public" && this.state.secondMOT === "walk") {
      //Public-Walk
      this.midY = (this.state.secondCoordinates.lat * 3 / 4) + (this.state.userCoordinates.lat / 4);
      this.midX = (this.state.secondCoordinates.lng * 3 / 4) + (this.state.userCoordinates.lng / 4);
    } else if (this.state.userMOT === "walk" && this.state.secondMOT === "bike") {
      //Walk-Bike
      this.midY = (this.state.secondCoordinates.lat / 3) + (this.state.userCoordinates.lat * 2 / 3);
      this.midX = (this.state.secondCoordinates.lng / 3) + (this.state.userCoordinates.lng * 2 / 3);
    } else if (this.state.userMOT === "bike" && this.state.secondMOT === "walk") {
      //Bike-Walk
      this.midY = (this.state.secondCoordinates.lat * 2 / 3) + (this.state.userCoordinates.lat / 3);
      this.midX = (this.state.secondCoordinates.lng * 2 / 3) + (this.state.userCoordinates.lng / 3);
    } else if (this.state.userMOT === "bike" && this.state.secondMOT === "public") {
      //Bike-Public
      this.midY = (this.state.secondCoordinates.lat * 2 / 5) + (this.state.userCoordinates.lat * 3 / 5);
      this.midX = (this.state.secondCoordinates.lng * 2 / 5) + (this.state.userCoordinates.lng * 3 / 5);
    } else if (this.state.userMOT === "public" && this.state.secondMOT === "bike") {
      //Public-Bike
      this.midY = (this.state.secondCoordinates.lat * 3 / 5) + (this.state.userCoordinates.lat * 2 / 5);
      this.midX = (this.state.secondCoordinates.lng * 3 / 5) + (this.state.userCoordinates.lng * 2 / 5);
    } else {
      //Car-Car Bike-Bike Walk-Walk Public-Public OR just no MOT specified
      this.midY = ((this.state.secondCoordinates.lat + this.state.userCoordinates.lat) / 2);
      this.midX = ((this.state.secondCoordinates.lng + this.state.userCoordinates.lng) / 2);
    }
    // console.log("Getting midpoints based on MOT:", this.midX, this.midY)
  }

  midPoint = () => {
    this.midPointBasedOnMOT();

    const midObj = {};
    midObj.lat = this.midY
    midObj.lng = this.midX

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
    this.setState({
      [e.target.id]: e.target.value
    })
    }


  searchFirebase = (search, node, callback) => {
    // console.log('searchingFB');
    const dbRefName = firebase.database().ref(`/userNames/`);
    console.log(dbRefName);
    dbRefName.once('value').then((snapshot) => {
      const newArrayOfArrays = Object.entries(snapshot.val())
      // console.log(snapshot.val());
      newArrayOfArrays.forEach((array) => {
        // console.log(array)
        // console.log(search)
        // console.log(array)
        if (search === array[0]) {
          this.setState({
            searchedUID: array[1]
          });
        }
      })
    })
    // console.log('node1', node);
    callback(search, node)
  }  



  getCoordinatesRelatedToSearch = (search, node) => {
    // console.log('node2',node);
    this.setState({
      secondLocationBelongsToUser: false,
      searchedUID: ""
    });
    const dbRefNode = firebase.database().ref(`/${node}/`);
    dbRefNode.once('value').then((snapshot) => {  
      // console.log(snapshot);
      const newArrayOfArrays = Object.entries(snapshot.val());
      newArrayOfArrays.forEach((item) => {
        // console.log('all entries', item);
        // console.log(this.state.searchedUID);
        if (this.state.searchedUID === item[0]) {
          this.setState({
            secondLocationBelongsToUser: true,
            item:item
          })
        }
      })
      if (this.state.secondLocationBelongsToUser){
        this.searchForCoordinates(this.state.search, this.state.item)
      } else {
        this.searchForCoordinates(this.state.search)
      }
    })  
    // this.setState({
    //   searchedUID: ""
    // })
  }

  fetchMessages = () => {
    // console.log('fetching');
    const dbRef = firebase.database().ref(`/messages/${this.state.user.uid}/`);
    dbRef.once('value').then((snapshot) => {
      if (snapshot.val() === null){
        return
      }
      // console.log('snapshot', snapshot.val());
      const newArray = [];
      Object.entries(snapshot.val()).forEach((entry) => {
        // console.log(entry);
        const newObject = entry[1];
        newObject.key = entry[0];
        newArray.push(newObject);
        
        // console.log('not in state', newArray)
      });
      this.setState({
        messages: newArray
      }, () => {
        this.sortMessages();
      });
    });
  }

  sortMessages = () => {
    console.log(this.state.messages);
    const newMessagesArray = this.state.messages.sort((a, b) => {
      // console.log('a',a,'b',b);
      return a.currentDate - b.currentDate;
    })
    // console.log(newMessagesArray);
  }

  handleClickDisplayMessages = () => {
    if (this.state.messagesdisplayed) {
      this.setState({
        messagesdisplayed: false
      });
    } else {
      this.setState({
        messagesdisplayed: true
      });
    }
  }


  
  searchForCoordinates = (search, user) => {
    this.getCoordinates(this.state.userLocation, this.setUserCoordinates);
    if(user){
      this.setState({
        secondLocation: user[1].userAddress,
        secondUserName: user[1].userName, 
        // secondLocationBelongsToUser: true
      }, () => {
        // console.log('setting second location', this.state.secondLocation);
        // console.log("is a user: getting coordinates");
        this.getCoordinates(this.state.secondLocation, this.setSecondCoordinates);
      });
      } else {
      // console.log('not a user: getting coordinates')
      this.setState({
        secondLocation: search
      }, () => {
        this.getCoordinates(this.state.secondLocation, this.setSecondCoordinates);
      })
    }
    this.setState({
      item: {},
      search: ""
    })
  }

  handleSendMessage = (e) => {
    e.preventDefault();
    this.searchFirebase(this.state.secondUserName, `messages`, this.deliverNewMessage);
  }

  deliverNewMessage = (receiver, node) => {
    const dbRefNode = firebase.database().ref(`/${node}/${this.state.searchedUID}/`)
    const newMessageObject = {
      from: this.state.userName,
      sendingUID: this.state.user.uid,
      message: this.state.newMessageContent,
      displayDate: new Date().toDateString(),
      currentDate: Date()
      //should also add yelp ID
    }
    dbRefNode.push(newMessageObject);
  }

  handleMOTChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
          signInAsGuest={this.signInAsGuest}
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
          secondLocationBelongsToUser={this.state.secondLocationBelongsToUser}
          newMessageContent={this.state.newMessageContent}
          handleSendMessage={this.handleSendMessage}
          handleMOTChange={this.handleMOTChange}
          messages={this.state.messages}
          handleClickDisplayMessages={this.handleClickDisplayMessages}
          messagesdisplayed={this.state.messagesdisplayed}
          />
          
        )}/>
        </div>
      </Router>
    );
  }
}

export default App;

