import { AmenitiesList } from "./AmenitiesList";

export function AmenitiesModal({ stay, isModalActive }) {
    return (
        <AmenitiesList stay={stay} isModalActive={true} />
    )
}