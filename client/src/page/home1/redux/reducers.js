import {combineReducers} from 'redux';
// import { routerStateReducer } from 'redux-router';
import {routerReducer} from 'react-router-redux'

function newsdata(state = {loading: false, data:[]}, action) {
    // console.log(action.type);
    switch (action.type) {
        case "SENDREQUEST":
            console.log(action.data);
            return Object.assign({}, state, {loading: true});
        case "RECEIVEDATA":
            return Object.assign({}, state, {loading: false, data: state.data.concat(action.payload)});
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    newsData: newsdata,
    router: routerReducer
});

export default rootReducer;