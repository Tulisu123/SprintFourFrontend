import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import Logo from '../cmps/Logo'
import { loadReservationsByUser, updateReservationStatus } from "../store/actions/reservations.actions";

export function ManageBooking() {
    const user = useSelector((storeState) => storeState.userModule.user);
    const reservations = useSelector(storeState => storeState.reservationModule.reservations);

    useEffect(() => {
        if (user && user._id) {
            loadReservationsByUser(user._id);
        }
    }, [user])

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    }

    async function onUpdateReserveStatus(reserveId, action) {
        await updateReservationStatus(reserveId, action)

    }



    return (
        <section className="manage-booking-container">
            <NavLink to="/" className="logo">
                <Logo />
                <h1>airbnb</h1>
            </NavLink>

            <h2>Manage booking</h2>
            <div className="reservations-list">
                {reservations.length === 0 ? (
                    <p>No reservations found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Guest</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Listing</th>
                                <th>Total Payout</th>
                                <th>Status</th>
                                <th>To do</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reserve) => (
                                <tr key={reserve._id}>
                                    <td>{reserve.username}</td>
                                    <td>{formatDate(reserve.start)}</td>
                                    <td>{formatDate(reserve.end)}</td>
                                    <td>{reserve.stayName}</td>
                                    <td>₪ {reserve.price}</td>
                                    <td>{reserve.status}</td>
                                    <td>
                                        {reserve.status === 'Pending' && (

                                            <div className="btn-container">
                                                <button
                                                    className="approve"
                                                    onClick={() => onUpdateReserveStatus(reserve._id, 'Approved')}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="deny"
                                                    onClick={() => onUpdateReserveStatus(reserve._id, 'Denied')}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
}
