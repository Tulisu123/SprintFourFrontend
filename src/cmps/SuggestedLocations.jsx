import React from 'react';
import locations from '../assets/files/suggested-locations/suggested-locations.json'

export function SuggestedLocations({ setWhere, onClose }) {
    return (
        <div className="suggested-locations-container">
            <h1>Suggested destinations</h1>
            <div className='locations-list-container'>
                <ul className="locations-list">
                    {locations.map((location, index) => (
                        <li key={index} className="location" onClick={() => {
                            setWhere(location.name)
                            onClose()
                        }}>
                            <img
                                src={location.icon}
                                alt={location.name}
                                className="location-icon"
                            />
                            <div className="location-info">
                                <p className="location-name">{location.name}</p>
                                <p className="location-description">{location.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
