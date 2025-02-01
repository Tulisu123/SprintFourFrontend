import React from 'react'
import { Routes, Route, useHref } from 'react-router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StayDetails } from './pages/StayDetails'
import { UserDetails } from './pages/UserDetails'
import { PhotosPage } from './pages/PhotosPage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { StayFilter } from './cmps/StayFilter.jsx'
import { ReservePage } from './pages/ReservePage.jsx'
import { ManageBooking } from './pages/ManageBooking.jsx'
import { StayAdd } from './pages/StayAdd.jsx'

export function RootCmp() {
    const isHomePage = useSelector(storeState => storeState.systemModule.isHomePage)
    const [inputModal, setInputModal] = useState(null)
    const [isClosing, setIsClosing] = useState(false)
    const [isLoginSignupOpen, setIsLoginSignupOpen] = useState({ isOpen: false, action: null })
    const user = useSelector((storeState) => storeState.userModule.user)

    let href = useHref(null)
    const regex = /^\/([^\/]*)/
    const match = href.match(regex)
    const hrefFirstWord = match ? match[1] : ''

    function handleClose() {
        setIsClosing(true)
        setInputModal(null)
        setTimeout(() => {
            onClose();
        }, 100);
    }

    return (
        <div >
            <main className={`main-container ${hrefFirstWord}`}>
                <Routes>
                    <Route path="/" element={<StayIndex
                        inputModal={inputModal} setInputModal={setInputModal} isClosing={isClosing} setIsClosing={setIsClosing} isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen} user={user} handleClose={handleClose}
                    />} />
                    <Route path="/add-stay" element={<StayAdd />} />
                    <Route path="/manage-booking" element={<ManageBooking />} />
                    <Route path="/reservation-summary" element={<ReservePage />} />
                    <Route path="stay/:stayId" element={<StayDetails
                        inputModal={inputModal} setInputModal={setInputModal} isClosing={isClosing} setIsClosing={setIsClosing} isLoginSignupOpen={isLoginSignupOpen} setIsLoginSignupOpen={setIsLoginSignupOpen} user={user} handleClose={handleClose}
                    />} />
                    <Route path="/photos" element={<PhotosPage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div >
    )
}


