import { NavLink, Link } from "react-router-dom";
import Logo from "../cmps/Logo";
import { useState, useRef } from "react";
import { GuestSelector } from "../cmps/GuestSelector";
import { stayService } from "../services/stay";
import { useSelector } from "react-redux";
import { addStay } from "../store/actions/stay.actions";
import { AddressSearch } from "../cmps/AddressSearch.jsx"

export function StayAdd({ user }) {
    const views = ['initial', 'labels', 'placeType', 'guests', 'amenities', 'photos', 'pricing', 'location'] // Define ordered views
    const [view, setView] = useState('initial', 'placeType');
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })
    const [selectedAmenities, setSelectedAmenities] = useState([])
    const [imgUrls, setImgUrls] = useState([])
    const fileInputRef = useRef(null)
    const [pricePerNight, setPricePerNight] = useState('')
    const [selectedPlaceType, setSelectedPlaceType] = useState('Entire place')
    const [labels, setLabels] = useState([])

    const placeTypes = [
        {
            type: 'Entire place',
            description: 'Guests have the whole place to themselves.',
            icon: <i className="fa-sharp fa-light fa-house"></i>,
        },
        {
            type: 'Private room',
            description: 'Guests have their own room in a home, plus access to shared spaces.',
            icon: <i className="fa-sharp fa-light fa-door-open"></i>,
        },
        {
            type: 'Shared room in a hostel',
            description: (
                <>
                    Guests sleep in a shared room in a professionally managed <br />
                    hostel with staff onsite 24/7.
                </>
            ),
            icon: <i className="fa-sharp fa-light fa-house-user"></i>,
        },
    ]

    function handlePlaceTypeSelection(type) {
        setSelectedPlaceType(type)
    }

    const amenitiesList = [
        { name: 'Wifi', icon: <i className="fa-solid fa-wifi"></i> },
        { name: 'TV', icon: <i className="fa-solid fa-tv"></i> },
        { name: 'Kitchen', icon: <i className="fa-solid fa-utensils"></i> },
        { name: 'Washer', icon: <i className="fa-solid fa-soap"></i> },
        { name: 'Free parking on premises', icon: <i className="fa-solid fa-square-parking"></i> },
        { name: 'Paid parking on premises', icon: <i className="fa-solid fa-circle-dollar-to-slot"></i> },
        { name: 'Air conditioning', icon: <i className="fa-solid fa-snowflake"></i> },
        { name: 'Dedicated workspace', icon: <i className="fa-solid fa-laptop-house"></i> },
    ]

    const [location, setLocation] = useState({
        name: '',
        summary: '',
        address: '',
        city: '',
        country: '',
        countryCode: '',
    })

    function isLocationComplete() {
        return (
            location.address &&
            location.city &&
            location.country &&
            location.countryCode
        )
    }

    async function onAddPlace() {
        const newPlace = stayService.getEmptyStay()
        newPlace.name = location.name
        newPlace.type = ''
        newPlace.imgUrls = imgUrls
        newPlace.price = pricePerNight
        newPlace.summary = location.summary
        newPlace.capacity = getGuestsNumber()
        newPlace.amenities = selectedAmenities
        newPlace.roomType = ''
        newPlace.host = user
        newPlace.loc = {
            country: location.country,
            countryCode: location.countryCode,
            city: location.city,
            address: location.address,
            // lat: location.lat,
            // lng: location.lng,
        }
        newPlace.reviews = []
        newPlace.likedByUsers = []
        newPlace.labels = labels
        newPlace.reservedDates = []
        newPlace.equipment = {}
        newPlace.reservedDates = []

        await addStay(newPlace)

    }

    function handlePriceChange(event) {
        setPricePerNight(event.target.value);
    }

    function getGuestsNumber() {
        const { adults, children, infants, pets } = guests;
        return adults + children + infants + pets;
    }

    function handleFileChange(event) {
        const files = event.target.files
        if (!files.length) return

        const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
        setImgUrls((prev) => [...prev, ...newImages])
    }

    function handleAddPhotos() {
        fileInputRef.current.click();
    }

    function onAddLabel(label) {
        setLabels(prev =>
            prev.includes(label) ? prev.filter((label) => label !== label) : [...prev, label]
        )
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

    function handleLocationInputChange(event) {
        const { name, value } = event.target;
        setLocation((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    //get current position
    function getLatAndLng() { //generated
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation((prev) => ({
                        ...prev,
                        lat: latitude,
                        lng: longitude,
                    }));
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Unable to fetch your location. Please enter it manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    return (
        <section className="add-flow main-container add-stay full">
            {/* Header */}
            <header className="add-header">
                <Link to="/">
                    <Logo className="logo" />
                </Link>
                <Link to="/">
                    <div className="exit">
                        <button>Exit</button>
                    </div>
                </Link>
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

                {view === 'placeType' && (
                    <div className="place-type-selection">
                        <h2>What type of place will guests have?</h2>
                        <div className="place-type-options">
                            {placeTypes.map(({ type, description, icon }) => (
                                <div
                                    key={type}
                                    className={`place-type-card ${selectedPlaceType === type ? 'selected' : ''}`}
                                    onClick={() => handlePlaceTypeSelection(type)}
                                >
                                    <div className="place-type-info">
                                        <h3>{type}</h3>
                                        <p>{description}</p>
                                    </div>
                                    <span className="place-type-icon">{icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>
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
                                <div
                                    className={`label-item ${labels.includes(label) ? 'selected' : ''}`}
                                    key={label}
                                    onClick={() => onAddLabel(label)}
                                >
                                    {label === 'House' && <i className="fa-sharp fa-light fa-house"></i>}
                                    {label === 'Apartment' && <i class="fa-sharp fa-light fa-apartment"></i>}
                                    {label === 'Barn' && <i class="fa-light fa-farm"></i>}
                                    {label === 'Bed & breakfast' && <i class="fa-light fa-mug-saucer"></i>}
                                    {label === 'Boat' && <i class="fa-light fa-sailboat"></i>}
                                    {label === 'Cabin' && <i class="fa-sharp fa-light fa-cabin"></i>}
                                    {label === 'Camper/RV' && <i class="fa-light fa-caravan"></i>}
                                    {label === 'Casa particular' && <img src="/src/assets/icons/icons8-casa-batllo-48.png" alt="Casa Icon" className="label-icon" />}
                                    {label === 'Castle' && <i class="fa-sharp fa-light fa-castle"></i>}
                                    {label === 'Cave' && <img src="/src/assets/icons/icons8-cave-64.png" alt="Cave Icon" className="label-icon" />}
                                    {label === 'Container' && <i class="fa-light fa-container-storage"></i>}
                                    {label === 'Cycladic home' && <img src="/src/assets/icons/icons8-home-64.png" alt="Home Icon" className="label-icon" />}
                                    {label === 'Dammuso' && <img src="/src/assets/icons/icons8-duomo-di-milano-66.png" alt="Duomo Icon" className="label-icon" />}
                                    {label === 'Dome' && <i class="fa-sharp fa-light fa-landmark-dome"></i>}
                                    {label === 'Earth home' && <i class="fa-sharp fa-light fa-house-tree"></i>}
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
                            <h2>Add some photos of your place</h2>
                            <p>You’ll need 5 photos to get started. You can add more or make changes later.</p>
                        </div>

                        <div className="photo-upload-container">
                            <div className="photo-upload-box">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                {imgUrls.length <= 5 && (
                                    <>
                                        <img
                                            src="https://a0.muscache.com/im/pictures/mediaverse/mys-amenities-n8/original/c83b2a87-3be4-43c9-ad47-12dd2aee24c4.jpeg"
                                            alt="Camera Icon"
                                            className="camera-icon"
                                        />
                                        <button className="upload-btn" onClick={handleAddPhotos}>
                                            Add photos
                                        </button>
                                        <div className="uploaded-images">
                                            {imgUrls.map((url, index) => (
                                                <div key={index} className="photo-item">
                                                    <img src={url} alt={`Uploaded ${index}`} className="uploaded-img" />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {view === 'pricing' && (
                    <div className="pricing-view">
                        <div className="desc-container">
                            <h2>Set a price for your place</h2>
                            <p>Guests will see this price per night when they book your place.</p>
                        </div>

                        <div className="price-input-container">
                            <label htmlFor="price-input">Price per night ($)</label>
                            <input
                                id="price-input"
                                type="number"
                                min="1"
                                placeholder="Enter a price"
                                value={pricePerNight}
                                onChange={handlePriceChange}
                            />
                        </div>

                        {pricePerNight === '' && (
                            <p className="warning-text">Please set a price to proceed.</p>
                        )}
                    </div>
                )}
                {view === 'location' && (
                    <div className="location-view">
                        <div className="desc-container">
                            <h2>Add more details about your place</h2>
                            <p>Guests will see these details when they book your place.</p>
                        </div>

                        <div className="location-form">
                            {/* <div className="address"> */}
                            {/* <div className="map"></div> */}
                            <label>
                                Address:
                                {/* <AddressSearch /> */}
                                {/* <input /> */}
                                {/* </div> */}
                                <input
                                    type="text"
                                    name="address"
                                    value={location.address}
                                    onChange={handleLocationInputChange}
                                    placeholder="Enter address"
                                />
                            </label>

                            <label>
                                City:
                                <input
                                    type="text"
                                    name="city"
                                    value={location.city}
                                    onChange={handleLocationInputChange}
                                    placeholder="Enter city"
                                />
                            </label>

                            <label>
                                Country:
                                <input
                                    type="text"
                                    name="country"
                                    value={location.country}
                                    onChange={handleLocationInputChange}
                                    placeholder="Enter country"
                                />
                            </label>

                            <label>
                                Country Code:
                                <input
                                    type="text"
                                    name="countryCode"
                                    value={location.countryCode}
                                    onChange={handleLocationInputChange}
                                    placeholder="Enter country code"
                                />
                            </label>

                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={location.name}
                                    onChange={handleLocationInputChange}
                                    placeholder="Enter name"
                                />
                            </label>
                            <label>
                                Summary:
                                <textarea
                                    type="text"
                                    name="summary"
                                    value={location.summary}
                                    onChange={handleLocationInputChange}
                                    placeholder="Enter summary"
                                    className="summary-input"
                                />
                            </label>
                        </div>
                    </div>
                )}
            </main>

            <div className="full main-container add-stay stay-add-footer-wrapper">
                <div className="progress-bar">
                    {views.map((step, index) => (
                        <div
                            key={step}
                            className={`progress-step ${index <= views.indexOf(view) ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <footer className="stay-add-footer">
                    {/* Back Button */}
                    <button onClick={goToPreviousView} className="back-btn" style={{ visibility: view === 'initial' ? 'hidden' : 'visible' }}>
                        Back
                    </button>

                    {/* Next Button */}
                    {view === 'initial' ? (
                        <button className="next-btn" onClick={goToNextView}>
                            Get Started
                        </button>
                    ) : view === 'location' ? (
                        <Link to="/">
                            <button className="next-btn" onClick={onAddPlace}>Publish</button>
                        </Link>
                    ) : (
                        <button onClick={goToNextView} className="next-btn">
                            Next
                        </button>
                    )}
                </footer>
            </div>
        </section >
    );
}
