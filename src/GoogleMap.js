import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const GoogleMaps = ({ google, locationCoords }) => {
    return (
        <Map
            google={google}
            zoom={14}
            initialCenter={locationCoords}
            center={locationCoords}
        >
            <Marker position={locationCoords} />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMaps);
