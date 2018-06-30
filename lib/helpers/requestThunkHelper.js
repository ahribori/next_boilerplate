import request from 'axios';
import { createAction } from 'redux-actions';

export const createRequestThunk = (actionType, axiosOptions) => dispatch => {
    const pendingAction = createAction(`${actionType}_PENDING`);
    const successAction = createAction(`${actionType}_SUCCESS`);
    const failureAction = createAction(`${actionType}_FAILURE`);
    dispatch(pendingAction());
    return request(axiosOptions)
        .then(response => {
            dispatch(successAction({
                success: true,
                data: response.data,
            }));
        }).catch(error => {
            dispatch(failureAction({
                success: false,
                status: error.response.status,
                data: error.response.data,
                message: error.message,
            }));
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
