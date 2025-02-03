const { DEV, VITE_LOCAL } = import.meta.env

import { reservationService as local } from './reservation.service.local'
import { reservationService as remote } from './reservations.service.remote'

export const reservationService = VITE_LOCAL === 'true' ? local : remote

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.reservationService = reservationService
