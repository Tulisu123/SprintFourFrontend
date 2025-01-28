import React from 'react'
import { Routes, Route } from 'react-router'
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
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { StayFilter } from './cmps/StayFilter.jsx'
import { ReservePage } from './pages/ReservePage.jsx'
import { ManageBooking } from './pages/ManageBooking.jsx'
import { StayAdd } from './pages/StayAdd.jsx'

export function RootCmp() {
    const isHomePage = useSelector(storeState => storeState.systemModule.isHomePage)

    return (
        <div className="main-container">
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/add-stay" element={<StayAdd />} />
                    <Route path="/manage-booking" element={<ManageBooking />} />
                    <Route path="/reservation-summary" element={<ReservePage />} />
                    <Route path="stay/:stayId" element={<StayDetails />} />
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
        </div>
    )
}


