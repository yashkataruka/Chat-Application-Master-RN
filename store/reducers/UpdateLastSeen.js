import { UPDATE_LAST_SEEN } from "../actions/UpdateLastSeen"

const initialState = {
    lastSeen: [
        { _id: 1, lastSeenTime: "online"},
        { _id: 2, lastSeenTime: "online"},
        { _id: 3, lastSeenTime: "online"},
        { _id: 4, lastSeenTime: "09:37"}
    ]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_LAST_SEEN:
            const _id = action._id
            const oldState = [...state.lastSeen]
            // console.log(oldState)
            const index = oldState.findIndex(user => user._id === _id)
            if (index >= 0) {
                oldState[index].lastSeenTime = action.time
            }
            // console.log(oldState)
            return {
                ...state,
                lastSeen: oldState
            }
        default:
            return state
    }
}