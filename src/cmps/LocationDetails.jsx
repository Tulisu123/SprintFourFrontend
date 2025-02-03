import { useState, useEffect } from 'react';
import { DetailsMap } from '../cmps/DetailsMap.jsx'
import {
    setKey,
    fromAddress,
} from "react-geocode"

export function LocationDetails({ stay }) {
    const [coordinates, setCoordinates] = useState(null);

    setKey("AIzaSyDkzO6s6YGwc3GuJIuADmZoM2xyyZrvAiE")

    useEffect(() => {
        fromAddress(`${stay.loc.address}`)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                console.log(lat, lng);
                setCoordinates({ lat, lng });
            })
            .catch(console.error);

        return () => {
            setCoordinates(null)
        }
    }, [stay.loc.address])

    return (
        coordinates && < section className="location-details" >
            <h2 className='subtitle '>Where You'll be</h2>
            <div className='regular-text'>{stay.loc.address}</div>
            <DetailsMap /*lat={stay.loc.lat} lng={stay.loc.lan}*/ address={stay.loc.address} coordinates={coordinates} />
        </section >
    )
}