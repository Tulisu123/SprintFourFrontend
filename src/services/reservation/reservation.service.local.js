
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

    const demoReservation = [
        {
            "_id": "xFAoIi",
            "stayId": "622f337a75c7d36e498aaafd",
            "stayName": "Colosseum Retreat",
            "start": "2025-02-01",
            "end": "2025-02-03",
            "guests": "1",
            "price": "4912",
            "days": "2",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "S4dPn",
            "username": "User 1"
        },
        {
            "_id": "xFAoIj",
            "stayId": "622f337a75c7d36e498aaafd",
            "stayName": "Palm Pharoh place",
            "start": "2025-02-05",
            "end": "2025-02-08",
            "guests": "14",
            "price": "5632",
            "days": "4",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "pZFT4",
            "username": "Tal Peretz"
        }, {
            "_id": "jNF9hq",
            "stayId": "dIYrGA",
            "stayName": "Hilltop Resort",
            "start": "2025-10-25",
            "end": "2025-10-26",
            "guests": "16",
            "price": "4183",
            "days": "1",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "7mzKHf",
            "username": "Lior Cohen"
        },
        {
            "_id": "kZoIkP",
            "stayId": "SaKpdx",
            "stayName": "Seaside Lodge",
            "start": "2025-12-24",
            "end": "2025-12-25",
            "guests": "1",
            "price": "9345",
            "days": "1",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "gSp94L",
            "username": "Lior Cohen"
        },
        {
            "_id": "00bLBs",
            "stayId": "VhMasT",
            "stayName": "Seaside Lodge",
            "start": "2025-07-23",
            "end": "2025-07-26",
            "guests": "1",
            "price": "8020",
            "days": "3",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "0Ojimb",
            "username": "Noa Levi"
        },
        {
            "_id": "lKDVT4",
            "stayId": "ZOG78v",
            "stayName": "Modern Lodge",
            "start": "2025-03-09",
            "end": "2025-03-11",
            "guests": "15",
            "price": "8794",
            "days": "2",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "nRDIPY",
            "username": "Eli Shahar"
        },
        {
            "_id": "2qZ0Rs",
            "stayId": "oB27NV",
            "stayName": "Hilltop Oasis",
            "start": "2025-12-04",
            "end": "2025-12-06",
            "guests": "14",
            "price": "9367",
            "days": "2",
            "host": "S4dPn",
            "status": "Approved",
            "userId": "VbKXDU",
            "username": "Daniel Amir"
        }
    ]


    // Check if the reservation already exists to prevent duplicate data
    const existingReservations = await storageService.query('reservation');
    if (existingReservations && existingReservations.length > 0) {
        console.log('Reservations already exist in localStorage. No need to create demo data.');
        return;
    }

    for (const reserve of demoReservation) {
        await storageService.postWithoutIds('reservation', reserve);
    }
    // Add the demo reservation to local storage
    // await storageService.postWithoutIds(STORAGE_KEY, demoReservation);
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
    } else {
        console.log('error saving reservation')
    }
    return savedReserve
}