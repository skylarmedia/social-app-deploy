const INITIAL_STATE = {
    data: []
}

const getClients = (state, action) => (
    console.log(action, 'action in clients'), {

        ...state,
        data: action.clients
    })



function setClientsReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'GET_ALL_CLIENTS': {
            return getClients(state, action)
        }
        default:
            return state
    }
}

export default setClientsReducer;