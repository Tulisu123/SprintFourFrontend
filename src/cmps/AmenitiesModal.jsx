import { AmenitiesList } from "./AmenitiesList";

export function AmenitiesModal({ stay, isModalActive }) {
    return (
        <section className="amenities modal-window" >
            <h2 className="subtitle">What this place offers</h2>
            <AmenitiesList stay={stay} isModalActive={true} />
        </section >
    )
}