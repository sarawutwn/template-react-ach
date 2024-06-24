export default (state = [], action) => {
    switch(action.type) {
        case "SET_COMPONENT":
            return action.payload
        default:
            return state
    }
}
