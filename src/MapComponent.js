import React from 'react';
import {withGoogleMap, withScriptjs, GoogleMap, DirectionsRenderer, Marker} from 'react-google-maps';
import {compose, withProps, lifecycle, withHandlers} from 'recompose';



const googleApiKeyJS = "AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo"
const torontoCoordinates = {
    lat:43.6529,
    lng:-79.3849
}


const MapComponent = compose(
    withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    }), withHandlers({
        onMarkerClick: () => (marker) => {
            console.log(this)
            console.log(marker.latLng.lat(), marker.latLng.lng())
        },
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
    componentDidMount() {
        const DirectionsService = new window.google.maps.DirectionsService();

        DirectionsService.route({
            origin: new window.google.maps.LatLng(this.props.userCoordinatesLat, this.props.userCoordinatesLng),
            destination: new window.google.maps.LatLng(this.props.markerMidPoint.lat, this.props.markerMidPoint.lng),
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                console.log(result);
            this.setState({
                directions: result,
            });
            } else {
            console.error(`error fetching directions ${result}`);
            }
        });
    }
    })
    )(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter = {
            new window.google.maps.LatLng(43.6850075, -79.31502139999999)
        }
    >
        
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
    );




export default MapComponent