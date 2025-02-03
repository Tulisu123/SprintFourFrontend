import { httpService } from '../http.service'

export const reservationService = {
    query,
    save,
    getById,
    edit
    // remove,
}
window.cs = reservationService

async function query(hostId) {
    console.log('here in remote')
    if (!hostId) return
    var filteredReservations = await httpService.get(`reserve/host/${hostId}`)

    return filteredReservations
}

function getById(reservationId) {
    return httpService.get(`reserve/${reservationId}`)
}

async function save(reserve) {
    var savedReserve
    savedReserve = await httpService.post('reserve/add', reserve)
    console.log('reserve =>>>>>>>>>>>>>>>>', savedReserve)
    return savedReserve
}

async function edit(reserve) {
    console.log('editing reserve')
    var savedReserve
    savedReserve = await httpService.put('reserve/edit', reserve)
    console.log('reserve =>>>>>>>>>>>>>>>>', savedReserve)
    return savedReserve
}

