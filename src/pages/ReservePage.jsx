// import { useSearchParams } from 'react-router-dom'
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../cmps/Logo'
import { AppFooter } from '../cmps/AppFooter';
import { LoginSignup } from './LoginSignup';
import { CheckIcon } from '../cmps/CheckIcon';
import { userService } from '../services/user';
import { book } from '../store/actions/reservations.actions';

export function ReservePage() {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isLoginSignupOpen, setIsLoginSignupOpen] = useState({ isOpen: false, action: 'login' })

    const stayId = searchParams.get('stayId')
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const guests = searchParams.get('guests')
    const price = searchParams.get('price')
    const days = searchParams.get('days')


    const [finalReserve, setFinalReserve] = useState({
        stayId: stayId,
        stayName: stay.name,
        start: start,
        end: end,
        guests: guests,
        price: price,
        days: days,
        host: stay.host._id,
        status: 'Pending',
        userId: user?._id || '',
        username: user?.fullname || '',
    })


    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
        }).format(new Date(date));
    }

    function toggleIsLoginSignupOpen() {
        setIsLoginSignupOpen({
            ...isLoginSignupOpen,
            isOpen: true
        })
    }

    function closeLoginSignup() {
        setIsLoginSignupOpen({
            ...isLoginSignupOpen,
            isOpen: false
        });
    }

    async function onBookReserve() {
        await book(finalReserve)
        navigate('/')
    }

    return (
        <>
            <div className="booking-summary-container">
                <NavLink to="/" className="logo" >
                    <Logo />
                    <h1>airbnb</h1>
                </NavLink>

                <div className="booking-main">
                    {/* Left Column */}
                    <div className="booking-details">
                        <section className="trip-details">
                            {user && user._id && <div className="logged-in-message">
                                <CheckIcon />
                                <h2>Hi, you’re logged in</h2>
                                <p>Review your booking details to continue.</p>
                            </div>}
                            {user && <div className="lower-price-card">
                                <div className="text-content">
                                    <strong>Lower price.</strong>
                                    <p>Your dates are ₪53 less than the avg. nightly rate of the last 60 days.</p>
                                </div>
                                <div className="icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="28"
                                        height="28"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" />
                                        <path d="M12 8v4l2 2" />
                                    </svg>
                                </div>
                            </div>}
                            <h2>Your trip</h2>
                            <div className="trip-item">
                                <div>
                                    <p className='label'>Dates</p>
                                    <p className='info'>{formatDate(new Date(start))} – {formatDate(new Date(end))}</p>
                                </div>
                            </div>
                            <div className="trip-item">
                                <div>
                                    <p className='label'>Guests</p>
                                    <p className='info'>{guests} guest</p>
                                </div>
                            </div>
                            {user && <div className="policy-container">
                                <section className="cancellation-policy">
                                    <h2>Cancellation policy</h2>
                                    <p>
                                        <strong>Free cancellation before 2:00PM on Jan 27.</strong> Cancel before check-in on Feb 1 for a partial refund.{" "}                                </p>
                                </section>

                                <div className="border"></div>

                                <section className="ground-rules">
                                    <h2>Ground rules</h2>
                                    <p>
                                        We ask every guest to remember a few simple things about what makes a great guest.
                                    </p>
                                    <ul>
                                        <li>Follow the house rules</li>
                                        <li>Treat your Host’s home like your own</li>
                                    </ul>
                                </section>
                                <button className="reserve-btn" onClick={onBookReserve}>Request to book</button>
                            </div>}
                        </section>

                        <section className="user-info">
                            {!user && <><p onClick={toggleIsLoginSignupOpen} className='login-note'>Login or Signup to book</p></>}
                            {isLoginSignupOpen.isOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div className="backdrop" onClick={closeLoginSignup}></div>
                                    {/* LoginSignup Modal */}
                                    <LoginSignup isLoginSignupOpen={isLoginSignupOpen} closeLoginSignup={closeLoginSignup} />
                                </>
                            )}
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="price-summary-container">
                        <aside className="price-summary">
                            <div className="stay-info">
                                <img
                                    src={stay && stay.imgUrls[0]}
                                    alt={stay && stay.name}
                                    className="stay-image"
                                />
                                <div className="stay-details">
                                    <h3>{stay && stay.name}</h3>
                                    <p>{stay && stay.type}</p>
                                    <p className='reviews'>⭐ 5.00 ({stay && stay.revi} reviews) • Superhost</p>
                                </div>
                            </div>

                            <div className="price-details">
                                <h2>Price details</h2>
                                <div className="price-item">
                                    <p>₪ {stay && stay.price} x {days} nights</p>
                                    <p>₪ 300.30</p>
                                </div>
                                <div className="price-item">
                                    <p>Airbnb service fee</p>
                                    <p>₪ 31.00</p>
                                </div>
                                <div className="border"></div>
                                <div className="price-item total-price">
                                    <p>Total (₪)</p>
                                    <p>₪ {stay && price}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
}
