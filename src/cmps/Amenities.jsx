import { AmenitiesList } from './AmenitiesList.jsx';
import { SET_APP_MODAL_AMENITIES } from "../store/reducers/system.reducer.js";
import { useEffect } from 'react';

export function Amenities({ stay, isModalActive, handleShowMore, setAmenitiesToRender }) {
    const amenitiesWithIcon = [
        'Wifi',
        'Air conditioning',
        'Laptop-friendly workspace',
        'Heating',
        'Essentials',
        'Hot water',
        'Free parking on premises',
        'Washer',
        'Dryer',
        'Iron',
        'Hair dryer',
        'Shampoo',
        "Smoke detector",
        "Carbon monoxide detector",
        "First aid kit",
        "Fire extinguisher",
        "TV",
        "Hangers",
        "Ethernet connection",
        "Patio or balcony",
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
                    <span className="regular-white-btn" onClick={() => handleShowMore(SET_APP_MODAL_AMENITIES)} >
                        Show all {amenitiesToRender.length} amenities
                    </span>}
            </div>
        </section>
    )
}