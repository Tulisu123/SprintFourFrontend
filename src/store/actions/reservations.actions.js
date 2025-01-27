import { ADD_RESERVATION, UPDATE_RESERVATION_STATUS, SET_RESERVATIONS } from '../reducers/reservations.reducer';
import { userService } from '../../services/user'
import { store } from '../store'
import { stayService } from '../../services/stay'
import { reservationService } from '../../services/reservation/reservation.service.local';

export async function loadReservationsByUser(hostId) {
    try {
        const reservations = await reservationService.query(hostId)
        store.dispatch({ type: SET_RESERVATIONS, reservations })
    } catch (err) {
        console.log('Cannot load reservations', err)
        throw err
    }
}

export async function book(reservation) {
    const host = await userService.getById(reservation.host)
    const stay = await stayService.getById(reservation.stayId)

    const stayToUpdate = {
        ...stay,
        reservedDates: [
            ...stay.reservedDates,
            { start: _shortenDate(reservation.start), end: _shortenDate(reservation.end) }
        ]
    }
    await userService.addBookingToUser(reservation._id, host._id)
    await stayService.save(stayToUpdate)
    await addReservation(reservation)
}

export async function addReservation(reservetion) {
    console.log('adding reserve in action', reservetion)
    try {
        const newReserve = await reservationService.save(reservetion)
        return newReserve

    } catch (err) {
        console.log('Cannot add reservation', err)
        throw err
    }
}

export async function updateReservationStatus(id, status) {
    store.dispatch({ type: UPDATE_RESERVATION_STATUS, id, status })
    const reserve = await reservationService.getById(id)
    reserve.status = status
    await reservationService.save(reserve)
}

export function setReservations(reservations) {
    return { type: SET_RESERVATIONS, reservations };
}

function _shortenDate(longDate) {
    return longDate.split('T')[0]; // Extract the date portion before the 'T'
}