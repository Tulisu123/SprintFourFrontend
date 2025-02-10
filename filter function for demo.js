async function query(filterBy = { txt: '', price: 0, label: '', sortField: '', sortDir: 1, minCapacity: 0, checkInDate: null, checkOutDate: null }) {
    var stays = await storageService.query(STORAGE_KEY)
    const { txt, minCapacity, label, checkInDate, checkOutDate } = filterBy
    if (txt) {
        const regex = new RegExp(txt, 'i')
        stays = stays.filter(stay =>
            regex.test(stay.loc.address) ||
            regex.test(stay.loc.country) ||
            regex.test(stay.loc.city)
        )
    }

    if (minCapacity) {
        stays = stays.filter(stay => stay.capacity >= minCapacity)
    }

    if (label) {
        stays = stays.filter(stay => stay.labels.includes(label))
    }

    if (checkInDate && checkOutDate) {
        stays = stays.filter(stay => {
            return !stay.reservedDates.some(range => { 
                const rangeStart = new Date(range.start).getTime()
                const rangeEnd = new Date(range.end).getTime()

                const checkIn = new Date(checkInDate).getTime()
                const checkOut = new Date(checkOutDate).getTime()

                return !(checkOut <= rangeStart || checkIn >= rangeEnd)
            })
        })
    }
    return stays
}