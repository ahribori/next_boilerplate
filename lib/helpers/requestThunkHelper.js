import request from 'axios';
import { createAction } from 'redux-actions';

export const createRequestThunk = (actionType, axiosOptions = {}) => dispatch => {
    const pendingAction = createAction(`${actionType}_PENDING`);
    const successAction = createAction(`${actionType}_SUCCESS`);
    const failureAction = createAction(`${actionType}_FAILURE`);
    dispatch(pendingAction());
    return request(axiosOptions)
        .then(response => {
            const payload = {
                success: true,
                data: response.data,
            };
            dispatch(successAction(payload));
            return payload;
        })
        .catch(error => {
            const { response } = error;
            const payload = {
                success: false,
                status: response ? error.response.status : null,
                data: response ? error.response.data : null,
                message: error.message,
            };
            dispatch(failureAction(payload));
            return payload;
        });
};

export const createRequestThunkTypes = actionType => {
    return {
        DEFAULT: `${actionType}`,
        PENDING: `${actionType}_PENDING`,
        SUCCESS: `${actionType}_SUCCESS`,
        FAILURE: `${actionType}_FAILURE`,
    };
};

export const createPendingState = () => {
    return {
        pending: true,
        success: false,
        error: null,
    }
};

export const createSuccessState = () => {
    return {
        pending: false,
        success: true,
        error: null,
    }
};

export const createFailureState = (error) => {
    return {
        pending: false,
        success: false,
        error,
    }
};
