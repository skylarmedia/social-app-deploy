import { combineReducers } from 'redux';
import setClientsReducer from './clients';

const rootReducer = combineReducers({
    setClientsReducer: setClientsReducer
})

export default rootReducer;