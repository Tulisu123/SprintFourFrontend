import { ADD_RESERVATION, UPDATE_RESERVATION_STATUS, SET_RESERVATIONS } from '../reducers/reservations.reducer';
import { userService } from '../../services/user'
import { stayService } from '../../services/stay'

export async function book(reservation) {
    const host = await userService.getById(reservation.host)
    const stay = await stayService.getById(reservation.stayId)

    const stayToUpdate = {
        ...stay,
        reservedDates: [
            ...stay.reservedDates,
            { start: _shortenDate(reservation.start), end: _shortenDate(reservation.end)}
        ]
    }
    await userService.addBookingToUser(reservation._id, host._id)
    const updatedStay = await stayService.save(stayToUpdate)
    console.log('updatedStay', updatedStay)
}

export function updateReservationStatus(id, status) {
    return { type: UPDATE_RESERVATION_STATUS, id, status };
}

export function setReservations(reservations) {
    return { type: SET_RESERVATIONS, reservations };
}

function _shortenDate(longDate) {
    return longDate.split('T')[0]; // Extract the date portion before the 'T'
}