
const STORAGE_KEY = 'reservation'
import { storageService } from '../async-storage.service'
createDemoReservationData()

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

async function createDemoReservationData() {
    const demoReservation = {
        "_id": "xFAoIi",
        "stayId": "622f337a75c7d36e498aaafd",
        "stayName": "Colosseum Retreat",
        "start": "2025-02-01",
        "end": "2025-02-03",
        "guests": "1",
        "price": "4912",
        "days": "2",
        "host": "hwTN9",
        "status": "Approved",
        "userId": "S4dPn",
        "username": "User 1"
    };

    // Check if the reservation already exists to prevent duplicate data
    const existingReservations = await storageService.query(STORAGE_KEY);
    if (existingReservations.some(reservation => reservation._id === demoReservation._id)) {
        console.log('Demo reservation data already exists');
        return;
    }

    // Add the demo reservation to local storage
    await storageService.postWithoutIds(STORAGE_KEY, demoReservation);
    console.log('Demo reservation data created successfully!');
}

function getById(reservationId) {
    return storageService.get(STORAGE_KEY, reservationId)
}

async function save(reserve, action) {
    var savedReserve

    if (action === 'edit') {
        //UPDATE
        console.log('edit', reserve)
        savedReserve = await storageService.put(STORAGE_KEY, reserve)

    } if (action === 'add') {
        //ADD
        console.log('add', reserve)

        savedReserve = await storageService.post(STORAGE_KEY, reserve)
    }else{
        console.log('error saving reservation')
    }
    return savedReserve
}