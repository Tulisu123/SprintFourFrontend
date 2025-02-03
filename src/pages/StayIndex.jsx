import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStays, addStay, updateStay, removeStay, addStayMsg, clearStay } from '../store/actions/stay.actions'
import { renderFilterBar } from '../store/actions/system.actions.js';

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay/'
import { userService } from '../services/user'
import { LoginSignup } from '../cmps/LoginSignup.jsx';

import { StayList } from '../cmps/StayList'
import { StayFilter } from '../cmps/StayFilter'

import { AppFooter } from '../cmps/AppFooter.jsx'
import { AppHeader } from '../cmps/AppHeader.jsx';

export function StayIndex({ inputModal, setInputModal, isClosing, setIsClosing, isLoginSignupOpen, setIsLoginSignupOpen, user, handleClose }) {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [isMapVisible, setIsMapVisible] = useState(false)

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    useEffect(() => {
        renderFilterBar(true)

        return () => {
            renderFilterBar(false)
        }
    }, [])

    function toggleMap() {
        setIsMapVisible(!isMapVisible)
    }

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.loc.country = prompt('Country?')
        stay.loc.city = prompt('City?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const capacity = +prompt('New capacity?', stay.capacity)
        if (capacity === 0 || capacity === stay.capacity) return

        const stayToSave = { ...stay, capacity }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new capacity: ${savedStay.capacity}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
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

            <AppHeader isHomepage={true} inputModal={inputModal} setInputModal={setInputModal} isClosing={isClosing} setIsClosing={setIsClosing} user={user} isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen}></AppHeader>
            <main className="stay-index">
                <StayList
                    stays={stays}
                    onRemoveStay={onRemoveStay}
                    onUpdateStay={onUpdateStay}
                />
                <button className="show-map-btn" onClick={toggleMap}>
                    Show map <i class="fa-regular fa-map"></i>
                </button>
                {isMapVisible && (
                    <div className="map-overlay">
                        <h3>Map</h3>
                        <button onClick={toggleMap}>Close Map</button>
                    </div>
                )}
            </main>
            <AppFooter />
        </>
    )
}