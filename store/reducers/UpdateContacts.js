import { UPDATE_CONTACTS } from "../actions/UpdateContacts"

const initialState = {
    contacts: [
        {
            _id: 1, id_contacts: [ 2, 3, 4 ]
        },
        {
            _id: 2, id_contacts: [ 1 ]
        },
        {
            _id: 3, id_contacts: [ 1 ]
        },
        {
            _id: 4, id_contacts: [ 1 ]
        }
    ]
}

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CONTACTS:
            const newContactID = action.newContactID
            const _id = action._id
            const _idIndex = state.contacts.findIndex(contact => contact._id === _id);
            const updatedId = {...state.contacts}
            const oldIdContacts = updatedId[_idIndex].id_contacts
            const updatedIdContacts = oldIdContacts.concat(newContactID)
            updatedId[_idIndex].id_contacts = updatedIdContacts
            console.log(updatedId)
            return {
                ...state,
                contacts: updatedId
            }
        default: 
            return state
    }
}