import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, useLoadScript , Marker, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

const MapWithSearch = ({ googleMapsApiKey, onLocationSelect }) => {

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState({ lat: -1.300516, lng: 36.793271 });
    const [markers, setMarkers] = useState([]);
    const searchBoxRef = useRef(null);

    const onMapLoad = (map) => {
        setMap(map);
    }

    const onPlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();
        
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) {
                return
            }
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            if (onLocationSelect && places.length > 0) {
                const {geometry, name} = places[0]
                onLocationSelect({
                    latitude: geometry.location.lat(),
                    longitude: geometry.location.lng(),
                    location: name
                })
            }
        });
        map.fitBounds(bounds);

        setMarkers(places.map((place) => ({
            position: place.geometry.location
        })));
    }

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
            <GoogleMap
                mapContainerStyle={{ height: "400px", width: "400px" }}
                center={center}
                zoom={15}
                onLoad={onMapLoad}
            >
                <StandaloneSearchBox
                    onLoad={(ref) => searchBoxRef.current = ref}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            zIndex: '2',
                            position: 'absolute',
                        }}
                        ref={searchBoxRef}
                    />
                </StandaloneSearchBox>
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapWithSearch;