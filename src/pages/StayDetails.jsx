import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppHeader } from "../cmps/AppHeader.jsx"
import { Footer } from "../cmps/Footer.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { ReviewSection } from '../cmps/ReviewSection.jsx'
import { AppModal } from '../cmps/AppModal.jsx'
import { useDispatch } from 'react-redux'
import { Amenities } from '../cmps/Amenities.jsx'
import { Reserve } from '../cmps/Reserve.jsx'
import { LocationDetails } from '../cmps/LocationDetails.jsx'
import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js"
import { store } from "../store/store.js";
import { ProfilePic } from '../cmps/ProfilePic.jsx'
import { LoginSignup } from '../cmps/LoginSignup.jsx'

export function StayDetails({ inputModal, setInputModal, isClosing, setIsClosing, isLoginSignupOpen, setIsLoginSignupOpen, user, handleClose }) {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const [isModalActive, setIsModalActive] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [reviewIdxToScroll, setReviewIdxToScroll] = useState(0)

  // const [amenitiesToRender, setAmenitiesToRender] = store.getState(stay.amenities)


  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  const handleShowAllPhotos = () => {
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
      navigate("/photos", { state: { imgUrls: stay?.imgUrls || [] } })
    }, 300)
  }

  const handleImgShowAllPhotos = () => {
    navigate("/photos", { state: { imgUrls: stay?.imgUrls || [] } })
  }

  function handleShowMore(modalType) {
    dispatch({ type: modalType })
    setIsModalActive((prevModal) => !prevModal)
    document.body.classList.add('modal-open')
  }

  const onAddStayMsg = () => {
    try {
      const message = `This is a test message ${parseInt(Math.random() * 10)}`
      showSuccessMsg(`Stay message added: ${message}`)
    } catch (err) {
      showErrorMsg('Cannot add stay message')
    }
  }

  if (!stay) {
    return (
      <section className="stay-details">
        <p>Loading stay details...</p>
      </section>
    )
  }

  return (
    <>
      {inputModal && !isClosing && <div
        className={`backdrop-container ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
      >
      </div>}

      {isLoginSignupOpen.isOpen && !user && <div className="modal-backdrop login" onClick={() => setIsLoginSignupOpen(false)} />}

      {!user && isLoginSignupOpen.isOpen && (
        <LoginSignup isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen} />
      )}

      <AppHeader isHomepage={false} inputModal={inputModal} setInputModal={setInputModal} isClosing={isClosing} setIsClosing={setIsClosing} user={user} isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen} classNameToAdd={'stay'}></AppHeader>
      <section className="stay-details">
        {appModal &&
          <AppModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} modalType={appModal} stay={stay} reviewIdxToScroll={reviewIdxToScroll} />}

        <h1 className="stay-details-header">
          {stay.name}

          {/* <div className="actions-container">
            <button className="action-btn">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
              <span className="action-text">Share</span>
            </button>
            <button className="action-btn">
              <i className="fa-regular fa-heart"></i>
              <span className="action-text">Save</span>
            </button>
          </div> */}

        </h1>

        <div className="stay-images">
          {/* Main image */}
          <img
            className="main-image"
            src={stay.imgUrls[0]}
            alt="Main Stay Image"
            onClick={handleImgShowAllPhotos}
          />
          {/* Side images */}
          <img
            className="side-top"
            src={stay.imgUrls[1]}
            alt="Side Top Image"
            onClick={handleImgShowAllPhotos}
          />
          <img
            className="side-middle"
            src={stay.imgUrls[2]}
            alt="Side Middle Image"
            onClick={handleImgShowAllPhotos}
          />
          <img
            className="side-bottom-image"
            src={stay.imgUrls[3]}
            alt="Side Bottom Image"
            onClick={handleImgShowAllPhotos}
          />
          <img
            className="side-extra"
            src={stay.imgUrls[4]}
            alt="Side Extra Image"
            onClick={handleImgShowAllPhotos}
          />
          <button className={`show-all-btn ${isClicked ? 'clicked' : ''}`}
            onClick={handleShowAllPhotos}
          >
            <img
              src="/src/assets/icons/apps_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
              className="icon"
              alt="Show All Photos"
            />
            Show all photos
          </button>
        </div>
        <div className="stay-details-info">
          <section className='details-content'>

            <section className='subtitles'>
              <h2 className='subtitle'>
                {stay.roomType} in {stay.loc.city}, {stay.loc.country}
              </h2>
              <h3 className='regular-text'>
                {stay.capacity} guest{stay.capacity > 1 && 's'}  · {stay.equipment.bedroomNum} bedroom{stay.equipment.bedroomNum > 1 && 's'}  ·  {stay.equipment.bedsNum} bed{stay.equipment.bedsNum > 1 && 's'}  ·  {stay.equipment.bathNum} bath{stay.equipment.bathNum > 1 && 's'}
              </h3>
              <h4 className='bold-text reviews-summary'>
                <img src='../../src/assets/assets/icons/general icons/asset 158.svg' />
                <span>{stay.reviews.length ? '5.0  · ' : 'New'}</span>
                {stay.reviews.length > 0 &&
                  <a className='nostyle underline' onClick={() => { handleShowMore(SET_APP_MODAL_REVIEWS) }}>{stay.reviews.length} review{stay.reviews.length > 1 && 's'}</a>}
              </h4>
            </section>

            <div className="stay-host">
              <ProfilePic person={stay.host} />
              <p>
                <strong>Hosted by {stay.host.fullname}</strong>
              </p>
              {/* <button onClick={onAddStayMsg}>Add Stay Message</button> */}
            </div>

            <div className="stay-summary">
              <p>{stay.summary}</p>
            </div>
            {
              // stay.amenities &&
              <Amenities stay={stay} isModalActive={isModalActive} handleShowMore={handleShowMore} />}
          </section>

          <div className="stay-reserve-container">
            <Reserve />
          </div>
        </div>
        <LocationDetails stay={stay} />
        {stay.reviews.length > 0 &&
          <ReviewSection stay={stay} handleShowMore={handleShowMore} isModalActive={isModalActive}
            setReviewIdxToScroll={setReviewIdxToScroll} />}
        {/* Footer */}
        {/* <Footer /> */}
      </section >
    </>
  )
}



