export default (state = {crm_role_name: "", crm_role_id: ""}, action) => {
    switch(action.type) {
        case "SET_ROLE":
            return action.payload
        default:
            return state
    }
}
