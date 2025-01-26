export const ADD_RESERVATION = 'ADD_RESERVATION';
export const UPDATE_RESERVATION_STATUS = 'UPDATE_RESERVATION_STATUS';
export const SET_RESERVATIONS = 'SET_RESERVATIONS';

const initialState = {
    reservations: [], // List of all reservations
};

export function reservationsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_RESERVATION:
            return { ...state, reservations: [...state.reservations, action.reservation] };

        case UPDATE_RESERVATION_STATUS:
            return {
                ...state,
                reservations: state.reservations.map(reservation =>
                    reservation.id === action.id ? { ...reservation, status: action.status } : reservation
                ),
            };

        case SET_RESERVATIONS:
            return { ...state, reservations: action.reservations };

        default:
            return state;
    }
}
