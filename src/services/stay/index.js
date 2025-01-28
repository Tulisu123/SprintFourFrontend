const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
    return {
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0,
        },
        price: getRandomIntInclusive(200, 1500),
        capacity: getRandomIntInclusive(1, 10),
        msgs: [],
        host:{_id:'', fullname:'', pictureUrl:'https://randomuser.me/api/portraits/men/1.jpg'},
        type:''
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minCapacity: 1,
        label: '',
        sortField: '',
        sortDir: '',
        checkInDate: null, // Default value for check-in date
        checkOutDate: null, // Default value for check-out date
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
