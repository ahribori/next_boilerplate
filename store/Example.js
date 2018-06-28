import update from 'immutability-helper';
import { createAction, handleActions } from 'redux-actions';

const initialState = {
    lastUpdate: 0,
    light: false,
    count: 0,
};

const TICK = 'TICK';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

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

}, initialState);

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
