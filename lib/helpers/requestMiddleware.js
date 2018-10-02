import request from 'axios';

request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { status } = error.response;
        switch (status) {
            case 401: {
                break;
            }
            case 403: {
                break;
            }
            default:
        }
        throw error;
    },
);
