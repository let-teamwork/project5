import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDJBm5MdUDeMS9_IIO-oxaDeJnBTZWjm8s",
    authDomain: "meet-halfway-905ad.firebaseapp.com",
    databaseURL: "https://meet-halfway-905ad.firebaseio.com",
    projectId: "meet-halfway-905ad",
    storageBucket: "",
    messagingSenderId: "663721759286"
};
firebase.initializeApp(config);

export default firebase