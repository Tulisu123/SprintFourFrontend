import { stayService } from "../../services/stay"

export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_STAY_MSG = 'ADD_STAY_MSG'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    stays: null,
    stay: null,
    filterBy: stayService.getDefaultFilter(),
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break
        case SET_STAY:
            console.log('action stay', action.stay)
            newState = { ...state, stay: action.stay }
            break
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case ADD_STAY_MSG:
            newState = { ...state, stay: { ...state.stay, msgs: [...state.stay.msgs || [], action.msg] } }
            break
        case SET_FILTER_BY:
            const updatedFilterBy = {
                ...state.filterBy,
                ...action.filterBy, // Merge the incoming updates
            }

            // Save to localStorage for persistence
            localStorage.setItem('filterBy', JSON.stringify(updatedFilterBy))

            // Update state with the new filterBy
            newState = {
                ...state,
                filterBy: updatedFilterBy,
            }
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const stay1 = {
        _id: 'b101',
        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Lisbon',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413,
        },
        msgs: []
    }
    const stay2 = {
        _id: 'b102',
        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Lisbon',
            address: '18 Kombo st',
            lat: -8.61308,
            lng: 41.1413,
        },
        msgs: []
    }

    state = stayReducer(state, { type: SET_STAYS, stays: [stay1] })
    console.log('After SET_STAYS:', state)

    state = stayReducer(state, { type: ADD_STAY, stay: stay2 })
    console.log('After ADD_STAY:', state)

    state = stayReducer(state, { type: UPDATE_STAY, stay: { ...stay2, loc: 'Good' } })
    console.log('After UPDATE_STAY:', state)

    state = stayReducer(state, { type: REMOVE_STAY, stayId: stay2._id })
    console.log('After REMOVE_STAY:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = stayReducer(state, { type: ADD_STAY_MSG, stayId: stay1._id, msg })
    console.log('After ADD_STAY_MSG:', state)

    state = stayReducer(state, { type: REMOVE_STAY, stayId: stay1._id })
    console.log('After REMOVE_STAY:', state)
}

