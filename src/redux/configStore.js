import { combineReducers, createStore } from 'redux';
import { productsReducer } from './reducers/productsReducer';
import { userReducer } from './reducers/userReducer';


const rootReducer  = combineReducers({
    productsReducer:productsReducer,
    userReducer:userReducer
});

export const store = createStore(rootReducer);
