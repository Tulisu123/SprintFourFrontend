import { useEffect, useState } from "react"
import { makeId } from "../services/util.service.js"

export function AmenitiesList({ stay, amenities, isModalActive }) {
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
    const [amenitiesToRender, setAmenitiesToRender] = useState([])

    useEffect(() => {
        setAmenitiesToRender((isModalActive) ? stay.amenities : amenities.slice(0, 10))
        if (isModalActive) setAmenitiesToRender(stay.amenities.filter(amenity => amenitiesWithIcon.includes(amenity)))
    }, [stay])


    return (
        <div className="amenities-list">
            <ul>
                {amenitiesToRender.map((amenity) => {
                    return (
                        <li key={makeId()} className="amenity">


                            <img src={`../../src/assets/assets/icons/amenities/${amenity}.svg`} />


                            <span className="regular-text">{amenity}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}