import React, { useState } from 'react';

export function GuestSelector({ guests, setGuests }) {
    const handleIncrement = (key) => {
        setGuests((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    }

    const handleDecrement = (key) => {
        setGuests((prev) => ({ ...prev, [key]: Math.max(prev[key] - 1, 0) }));
    }

    return (
        <div className="guest-selector">
            {Object.entries(guests).map(([key, value]) => (
                <div key={key} className="guest-row">
                    <div className="guest-info">
                        <p className="guest-type">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                        <p className="guest-description">
                            {key === 'adults' ? 'Ages 18 or above' :
                                key === 'children' ? 'Ages 2 – 17' :
                                    key === 'infants' ? 'Under 2' :
                                        'Bringing a service animal?'}
                        </p>
                    </div>
                    <div className="guest-controls">
                        <button
                            type="button"
                            className="guest-btn decrement"
                            onClick={() => handleDecrement(key)}
                            disabled={value === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M0.75 6.75H11.25V5.25H0.75V6.75Z" fill="grey" />
                            </svg>


                        </button>
                        <span className="guest-count">{value}</span>
                        <button
                            type="button"
                            className="guest-btn increment"
                            onClick={() => handleIncrement(key)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6.75 0.75V5.25H11.25V6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75Z" fill="grey" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
