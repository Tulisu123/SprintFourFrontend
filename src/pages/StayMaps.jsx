//import.meta.env.GOOGLE_MAPS_API_KEY

import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StayPreview } from '../cmps/StayPreview';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    gridColumn:'1/-1',
}

const center = { lat: 0, lng: 0 }; // Default center if no stays are available

export function StayMaps() {
    const stays = useSelector(storeState => storeState.stayModule.stays);

    // Filter valid stays with lat/lan before rendering
    const validStays = stays.filter(stay => stay.loc && stay.loc.lat !== undefined && stay.loc.lan !== undefined);

    // Automatically center on the first valid stay or use default center
    const mapCenter =  center;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY// Replace with your actual API key
    });

    const [selectedStay, setSelectedStay] = useState(null);
    const [mapRef, setMapRef] = useState(null);

    // Smooth zoom to the marker when selected
    useEffect(() => {
        if (selectedStay && mapRef) {
            mapRef.panTo({ lat: selectedStay.loc.lat, lng: selectedStay.loc.lan });
            mapRef.setZoom(5); // Adjust zoom level as needed
        }
    }, [selectedStay, mapRef]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map" style={{ width: '100%', height: '100%' }}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={3}
                onLoad={map => setMapRef(map)}
            >
                {validStays.map((stay) => (
                    <Marker
                        key={stay._id}
                        position={{ lat: stay.loc.lat, lng: stay.loc.lan }}
                        onClick={() => setSelectedStay(stay)}
                    />
                ))}

                {selectedStay && (
                    <InfoWindow
                        position={{ lat: selectedStay.loc.lat, lng: selectedStay.loc.lan }}
                        onCloseClick={() => setSelectedStay(null)}
                    >
                        <div className='stay-panel-map'>
                            <StayPreview stay={selectedStay}/>
                            <Link to={`/stay/${selectedStay._id}`} className='visit-btn'>Visit</Link>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}
