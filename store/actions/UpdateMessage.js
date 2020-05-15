export const UPDATE_MESSAGES = "UPDATE_MESSAGES"

export const updateMessage = (_id, receiver_id, newMessage) => {
    return {
        type: UPDATE_MESSAGES,
        _id: _id,
        receiver_id: receiver_id,
        newMessage: newMessage
    }
}