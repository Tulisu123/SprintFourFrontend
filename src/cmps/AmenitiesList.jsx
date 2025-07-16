import { useEffect, useState } from "react"
import { makeId } from "../services/util.service.js"

export function AmenitiesList({ stay, amenities, isModalActive }) {

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
    const [amenitiesToRender, setAmenitiesToRender] = useState([])

    useEffect(() => {
        setAmenitiesToRender((isModalActive) ? stay.amenities : amenities.slice(0, 10))
        if (isModalActive) setAmenitiesToRender(stay.amenities.filter(amenity => amenitiesWithIcon.includes(amenity)))
    }, [stay])


    return (
        <div className={`amenities-list ${isModalActive ? 'list-modal' : ''}`}>
            <ul>
                {amenitiesToRender.map((amenity) => {
                    return (
                        <li key={makeId()} className={`amenity ${isModalActive ? 'amenitie-modal' : ''}`}>


                            <img src={`https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261885/${amenity}.svg`} />


                            <span className="regular-text">{amenity}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}