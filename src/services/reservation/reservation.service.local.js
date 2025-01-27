
const STORAGE_KEY = 'reservation'
import { storageService } from '../async-storage.service'

export const reservationService = {
    query,
    save,
    getById,
    // remove,
}
window.cs = reservationService

async function query(hostId) {
    if (!hostId) return
    var reservations = await storageService.query(STORAGE_KEY)

    //TODO: query by host Id
    return reservations.filter(reserve => reserve.host === hostId)
}

function getById(reservationId) {
    return storageService.get(STORAGE_KEY, reservationId)
}

async function save(reserve) {
    var savedReserve

    if (reserve._id) {
        //UPDATE
        console.log('edit', reserve)
        savedReserve = await storageService.put(STORAGE_KEY, reserve)

    } else {
        //ADD
        console.log('add', reserve)

        savedReserve = await storageService.post(STORAGE_KEY, reserve)
    }
    return savedReserve
}