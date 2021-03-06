import update from 'immutability-helper';
import { createAction, handleActions } from 'redux-actions';
import { createRequestThunk, createRequestThunkTypes } from '../lib/helpers/requestThunkHelper';


// ACTION TYPES
const TICK = 'TICK';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const FETCH = createRequestThunkTypes('example/FETCH');


// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
    return dispatch(createAction(TICK)({
        light: !isServer, ts: Date.now(),
    }));
};

export const startClock = dispatch => {
    return setInterval(() => {
        dispatch(createAction(TICK)({
            light: true, ts: Date.now(),
        }));
    }, 1000);
};

export const incrementCount = () => dispatch => {
    return dispatch(createAction(INCREMENT)());
};

export const decrementCount = () => dispatch => {
    return dispatch(createAction(DECREMENT)());
};

export const resetCount = () => dispatch => {
    return dispatch(createAction(RESET)());
};

export const fetch = (/* Arguments passed from react component */) => {
    return createRequestThunk(FETCH.DEFAULT, {
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
        headers: {
            authorization: '',
        },
    });
};

// INITIAL STATE
const initialState = {
    lastUpdate: 0,
    light: false,
    count: 0,
    fetch: null,
};

// REDUCERS
export default handleActions({

    [TICK]: (state, action) => update(state, {
        lastUpdate: { $set: action.payload.ts },
        light: { $set: !!action.payload.light },
    }),
    [INCREMENT]: (state) => update(state, {
        count: { $set: state.count + 1 },
    }),
    [DECREMENT]: (state) => update(state, {
        count: { $set: state.count - 1 },
    }),
    [RESET]: (state) => update(state, {
        count: { $set: initialState.count },
    }),

    [FETCH.PENDING]: (state) => {
        return state;
    },
    [FETCH.SUCCESS]: (state, action) => update(state, {
        fetch: { $set: action.payload },
    }),
    [FETCH.FAILURE]: (state, action) => update(state, {
        fetch: { $set: action.payload },
    }),

}, initialState);
