export const UPDATE_MESSAGES = "UPDATE_MESSAGES"
export const UPDATE_TICKS = "UPDATE_TICKS"

export const updateMessage = (_id, receiver_id, newMessage) => {
    return {
        type: UPDATE_MESSAGES,
        _id: _id,
        receiver_id: receiver_id,
        newMessage: newMessage
    }
}

export const updateTicks = (_id, receiver_id ) => {
    return {
        type: UPDATE_TICKS,
        _id: _id,
        receiver_id: receiver_id
    }
}