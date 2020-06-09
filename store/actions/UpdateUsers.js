export const UPDATE_USERS = "UPDATE_USERS"

export const updateUsers = (newUser) => {
    return {
        type: UPDATE_USERS,
        newUser: newUser
    }
}