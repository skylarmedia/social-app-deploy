import { combineReducers } from 'redux';
import setClientsReducer from './clients';
import editPostReducer from './editPost';

const rootReducer = combineReducers({
    setClientsReducer: setClientsReducer,
    editPostReducer: editPostReducer
})

export default rootReducer;