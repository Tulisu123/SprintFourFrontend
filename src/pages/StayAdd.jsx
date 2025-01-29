import { NavLink } from "react-router-dom";
import Logo from "../cmps/Logo";
import { useState } from "react";
import { GuestSelector } from "../cmps/GuestSelector";

export function StayAdd() {
    const views = ['initial', 'labels', 'guests', 'amenities'] // Define ordered views
    const [view, setView] = useState('initial');
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const amenitiesList = [
        { name: 'Wifi' },
        { name: 'TV' },
        { name: 'Kitchen' },
        { name: 'Washer' },
        { name: 'Free parking on premises'},
        { name: 'Paid parking on premises'},
        { name: 'Air conditioning'},
        { name: 'Dedicated workspace'},
    ];
    function onAddLabel(label) {
        console.log(label);
    }
    function toggleAmenity(amenity) {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
        )
    }
    function goToNextView() {
        const currentIndex = views.indexOf(view);
        if (currentIndex < views.length - 1) {
            setView(views[currentIndex + 1]);
        }
    }

    function goToPreviousView() {
        const currentIndex = views.indexOf(view);
        if (currentIndex > 0) {
            setView(views[currentIndex - 1]);
        }
    }

    return (
        <section className="add-flow">
            {/* Header */}
            <header className="add-header">
                <NavLink>
                    <Logo />
                </NavLink>
                <div className="exit">
                    <button>Exit</button>
                </div>
            </header>

            {/* Main Content */}
            <main className={`main-content ${view}`}>
                {view === 'initial' && (
                    <>
                        <div className="desc-container">
                            <p className="desc">It’s easy to get started on Airbnb</p>
                        </div>
                        <div className="details">
                            <div className="item item-one">
                                <div className="item-desc">
                                    <h1><span>1</span> Tell us about your place</h1>
                                    <p>Share some basic info, like where it is and how many guests can stay.</p>
                                </div>
                                <img src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg" alt="" />
                            </div>
                            <div className="item item-two">
                                <div className="item-desc">
                                    <h1><span>2</span> Make it stand out</h1>
                                    <p>Add 5 or more photos plus a title and description—we’ll help you out.</p>
                                </div>
                                <img src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg" alt="" />
                            </div>
                            <div className="item item-three">
                                <div className="item-desc">
                                    <h1><span>3</span> Finish up and publish</h1>
                                    <p>Choose a starting price, verify a few details, then publish your listing.</p>
                                </div>
                                <img src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg" alt="" />
                            </div>
                        </div>
                    </>
                )}

                {view === 'labels' && (
                    <div className="labels-view">
                        <div className="desc-container">
                            <p className="desc">Which of these best describes your place?</p>
                        </div>
                        <div className="labels-grid">
                            {[
                                'House',
                                'Apartment',
                                'Barn',
                                'Bed & breakfast',
                                'Boat',
                                'Cabin',
                                'Camper/RV',
                                'Casa particular',
                                'Castle',
                                'Cave',
                                'Container',
                                'Cycladic home',
                                'Dammuso',
                                'Dome',
                                'Earth home',
                            ].map((label) => (
                                <div className="label-item" key={label} onClick={() => onAddLabel(label)}>
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {view === 'guests' && (
                    <div className="guests-view">
                        <div className="desc-container">
                            <h2>Share some basics about your place</h2>
                            <p>You’ll add more details later, like bed types.</p>
                        </div>
                        <GuestSelector guests={guests} setGuests={setGuests} />

                    </div>
                )}
                {view === 'amenities' && (
                    <div className="amenities-view">
                        <div className="desc-container">
                            <h2>Tell guests what your place has to offer</h2>
                            <p>You can add more amenities after you publish your listing.</p>
                        </div>

                        <h3>What about these guest favorites?</h3>

                        <div className="amenities-grid">
                            {amenitiesList.map(({ name, icon }) => (
                                <div
                                    key={name}
                                    className={`amenity-item ${selectedAmenities.includes(name) ? 'selected' : ''}`}
                                    onClick={() => toggleAmenity(name)}
                                >
                                    <span className="icon">{icon}</span>
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'photos' && (
                    <div className="photos-view">
                        <div className="desc-container">
                            <p className="desc">Add some photos of your place</p>
                        </div>
                        <p>Photo upload UI here</p>
                    </div>
                )}

                {view === 'pricing' && (
                    <div className="pricing-view">
                        <div className="desc-container">
                            <p className="desc">Set a price for your place</p>
                        </div>
                        <p>Pricing input UI here</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className={view === 'initial' ? 'stay-add-footer initial-footer' : 'stay-add-footer'}>
                {view !== 'initial' && (
                    <button onClick={goToPreviousView} className="back-btn">
                        Back
                    </button>
                )}
                <button onClick={goToNextView} className="next-btn">
                    Next
                </button>
            </footer>
        </section>
    );
}
