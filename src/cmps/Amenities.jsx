import { AmenitiesList } from './AmenitiesList.jsx';
import { SET_APP_MODAL_AMENITIES } from "../store/reducers/system.reducer.js";
import { useEffect } from 'react';

export function Amenities({ stay, isModalActive, handleShowMore, setAmenitiesToRender }) {
    const amenitiesWithIcon = [
        'Wifi',
        'Air_conditioning',
        'Laptop-friendly_workspace',
        'Heating',
        'Essentials',
        'Hot_water',
        'Free_parking_on_premises',
        'Washer',
        'Dryer',
        'Iron',
        'Hair_dryer',
        'Shampoo',
        "Smoke_detector",
        "Carbon_monoxide_detector",
        "First_aid_kit",
        "Fire_extinguisher",
        "TV",
        "Hangers",
        "Ethernet_connection",
        "Patio_or_balcony",
    ]
    // useEffect(() => {
    //     if (stay.amenities.every(amenity => amenitiesWithIcon.includes(amenity))) {
    //         console.log('amenitiesToRender', amenitiesToRender)
    //         setAmenitiesToRender(stay.amenities.filter(amenity => amenitiesWithIcon.includes(amenity)))
    //     }
    // }, [])


    let amenitiesToRender = stay.amenities.filter(amenity => amenitiesWithIcon.includes(amenity))


    return (
        <section className="amenities">
            <div className="container">
                <h2 className="subtitle">What this place offers</h2>
                <AmenitiesList amenities={amenitiesToRender} isModalActive={isModalActive} />
                {amenitiesToRender.length > 10 &&
                    <button className="regular-white-btn" onClick={() => handleShowMore(SET_APP_MODAL_AMENITIES)} >
                        Show all {amenitiesToRender.length} amenities
                    </button>}
            </div>
        </section>
    )
}