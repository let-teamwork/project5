import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps"
import {compose, withProps, withHandlers} from 'recompose';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";


const googleApiKeyJS = "AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo"
const torontoCoordinates = {
    lat:43.6529,
    lng:-79.3849
}

let zoomVal = 12;

const MapWithMarkerClusterer = compose(
    withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB0fy93k6kiEYE_U0cUZYnRLXR-mzUQSyo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} className="wrapper mapComponent__mapContainer"/>,
    mapElement: <div style={{ height: `100%` }} />,
}), 
withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
    }, 
    // onMarkerClick: () => (marker) => {
    //                 const markerLatLng = {lat:marker.latLng.lat(), lng:marker.latLng.lng()}
    //                 console.log(markerLatLng)
    //                 return markerLatLng;
    //             },
}),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
    defaultZoom={zoomVal}
    defaultCenter={torontoCoordinates}
    onClick={props.zoomClick}
    >  
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            gridSize={3}
            >
        {props.markers.map(marker => (
        <Marker
            key={marker.alias}
            position={{ lat: marker.coordinates.latitude, lng: marker.coordinates.longitude }}
            onClick={props.getMarkerMidPoint}

            />
        ))}
        </MarkerClusterer>
    </GoogleMap>
);


export default MapWithMarkerClusterer;