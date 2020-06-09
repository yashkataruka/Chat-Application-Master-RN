export const UPDATE_LAST_SEEN = "UPDATE_LAST_SEEN"

export const updateLastSeen = (_id, time) => {
    return {
        type: UPDATE_LAST_SEEN,
        _id: _id,
        time: time
    }
}
