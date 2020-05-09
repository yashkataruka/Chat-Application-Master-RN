import TOGGLE_HEADER from '../actions/HomeHeaderDisplay';

const initialState = {
    homeHeaderVisible: true
}

export const homeHeaderReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_HEADER:
            value = state.homeHeaderVisible
            return {
                ...state,
                homeHeaderVisible: !value
            }
        default: 
            return state
    }
}