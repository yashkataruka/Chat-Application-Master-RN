export const UPDATE_CONTACTS = "UPDATE_CONTACTS"

export const updateContacts = (newContactId, _id) => {
    return {
        type: UPDATE_CONTACTS,
        newContactId: newContactId,
        _id: _id
    }
}