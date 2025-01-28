export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const LOAD_FILTER = 'LOAD_FILTER'

export const SET_APP_MODAL_REVIEWS = 'SET_APP_MODAL_REVIEWS'
export const CLOSE_APP_MODAL = 'CLOSE_APP_MODAL'
export const REMOVE_FOCUSED_MODAL = 'REMOVE_FOCUSED_MODAL'

export const SET_APP_MODAL_AMENITIES = 'SET_APP_MODAL_AMENITIES'

const initialState = {
  isLoading: false,
  isHomePage: false,

  isFocusedModal: false,
  appModal: false,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case LOAD_FILTER:
      return { ...state, isHomePage: action.bool }
    case CLOSE_APP_MODAL:
      return { ...state, appModal: false }
    case REMOVE_FOCUSED_MODAL:
      return { ...state, isFocusedModal: false }
    case SET_APP_MODAL_REVIEWS:
      return { ...state, appModal: SET_APP_MODAL_REVIEWS }
    case SET_APP_MODAL_AMENITIES:
      return { ...state, appModal: SET_APP_MODAL_AMENITIES }
    default: return state
  }
}
