// import { useSearchParams } from 'react-router-dom'
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useState } from 'react';

import Logo from '../cmps/Logo'
import { AppFooter } from '../cmps/AppFooter';
import { LoginSignup } from './LoginSignup';
import { HeaderAuthMenu } from '../cmps/HeaderAuthMenu';
import { CheckIcon } from '../cmps/CheckIcon';

export function ReservePage() {
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
                            <div className="logged-in-message">
                                <CheckIcon />
                                <h2>Hi, you’re logged in</h2>
                                <p>Review your booking details to continue.</p>
                            </div>
                            <div className="lower-price-card">
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
                            </div>
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
                            <div className="policy-container">
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
                            <section className="agreement">
                                <p>
                                    By selecting the button below, I agree to the{" "}
                                    <a href="#">Host's House Rules</a>, <a href="#">Ground rules for guests</a>,{" "}
                                    <a href="#">Airbnb's Rebooking and Refund Policy</a>, and that Airbnb can{" "}
                                    <a href="#">charge my payment method</a> if I'm responsible for damage.
                                </p>
                                <p>
                                    I also agree to the <a href="#">updated Terms of Service</a>,{" "}
                                    <a href="#">Payments Terms of Service</a>, and I acknowledge the{" "}
                                    <a href="#">Privacy Policy</a>.
                                </p>
                            </section>
                            <button className="reserve-btn">Request to book</button>
                        </div>
                        </section>

                        <section className="user-info">
                            {!user && <><p onClick={toggleIsLoginSignupOpen} className='login-note'>Login or Signup to make reservation</p></>}
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
                    <aside className="price-summary">
                        <div className="stay-info">
                            <img
                                src={stay && stay.imgUrls[0]}
                                alt={stay.name}
                                className="stay-image"
                            />
                            <div className="stay-details">
                                <h3>{stay.name}</h3>
                                <p>{stay.type}</p>
                                <p className='reviews'>⭐ 5.00 ({stay.revi} reviews) • Superhost</p>
                            </div>
                        </div>

                        <div className="price-details">
                            <h2>Price details</h2>
                            <div className="price-item">
                                <p>₪ {stay.price} x {days} nights</p>
                                <p>₪ 300.30</p>
                            </div>
                            <div className="price-item">
                                <p>Airbnb service fee</p>
                                <p>₪ 31.00</p>
                            </div>
                            <div className="border"></div>
                            <div className="price-item total-price">
                                <p>Total (₪)</p>
                                <p>₪ {price}</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <AppFooter />
        </>
    );
}
