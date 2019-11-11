import React from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import {useSelector} from "react-redux";

function ShowMap() {
    const state = useSelector(state => state.appState.points);
    const showMarker = state.map(marker =>
        <Marker position={marker.point}>
            <Popup>
                {marker.info}
            </Popup>
        </Marker>
    );
    return (
        <Map center={[55.753215, 37.622504]} zoom={7}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {showMarker}
        </Map>
    );

}

export default ShowMap;