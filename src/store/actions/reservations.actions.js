import { ADD_RESERVATION, UPDATE_RESERVATION_STATUS, SET_RESERVATIONS } from '../reducers/reservations.reducer';
import { userService } from '../../services/user'
import { store } from '../store'
import { stayService } from '../../services/stay'
import { reservationService } from '../../services/reservation/'

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
    console.log(reservation)
    const host = await userService.getById(reservation.host)
    const stay = await stayService.getById(reservation.stayId)

    const stayToUpdate = {
        ...stay,
        reservedDates: [
            ...stay.reservedDates,
            { start: reservation.start, end: reservation.end }
        ]
    }
    console.log('stayToUpdate in action', stayToUpdate)
    await userService.addBookingToUser(reservation._id, host._id) //todo - V
    await stayService.save(stayToUpdate) //TODO - backend
    await addReservation(reservation) // TODO- BACKEND - MONGO
}

export async function addReservation(reservetion) {
    console.log('adding reserve in action', reservetion)
    try {
        const newReserve = await reservationService.save(reservetion,'add')
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
    await reservationService.save(reserve,'edit')
}

export function setReservations(reservations) {
    return { type: SET_RESERVATIONS, reservations };
}

function _shortenDate(longDate) {
    return longDate.split('T')[0]; // Extract the date portion before the 'T'
}