import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from "react-google-maps"
import {compose, withProps, withHandlers, lifecycle} from 'recompose';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerClusterer"


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
}), withScriptjs,
withGoogleMap,
    lifecycle({
        // this lifecycle will run when you click on the butt "need directions" 
        componentDidUpdate(prevProps) {
            const userMOT = this.props.userMOT.toUpperCase()
            console.log(userMOT)
            const DirectionsService = new window.google.maps.DirectionsService();
            prevProps = this.props.runDirections
            console.log(prevProps)
            if(prevProps !== false){
                console.log("i should not run if")
                DirectionsService.route({
                    origin: new window.google.maps.LatLng(this.props.userCoordinatesLat, this.props.userCoordinatesLng),
                    destination: new window.google.maps.LatLng(this.props.markerMidPoint.lat, this.props.markerMidPoint.lng),
                    travelMode: window.google.maps.TravelMode[userMOT],
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        console.log(result);
                        this.props.getInfoFromDirections(result)
                        this.setState({
                            directions: result,
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                });
            } else {
                return null
            }
        }
    })
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
        {props.directions && <DirectionsRenderer directions={props.directions} 
        getInfoFromDirections = {
            props.getInfoFromDirections
        }
        />
        }
        </MarkerClusterer>
    </GoogleMap>
);


export default MapWithMarkerClusterer;