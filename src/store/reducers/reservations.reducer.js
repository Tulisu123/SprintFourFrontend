export const ADD_RESERVATION = 'ADD_RESERVATION';
export const UPDATE_RESERVATION_STATUS = 'UPDATE_RESERVATION_STATUS';
export const SET_RESERVATIONS = 'SET_RESERVATIONS';

const initialState = {
    reservations: [], 
}

export function reservationsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_RESERVATION:
            return { ...state, reservations: [...state.reservations, action.reservation] }

        case UPDATE_RESERVATION_STATUS:
            return {
                ...state,
                reservations: state.reservations.map(reservation =>
                    reservation._id === action.id // Match by `_id`
                        ? { ...reservation, status: action.status } // Optimistically update the status
                        : reservation
                )
            }

        case SET_RESERVATIONS:
            return { ...state, reservations: action.reservations };

        default:
            return state
    }
}
