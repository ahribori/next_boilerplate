import { connect } from 'react-redux';

export const inject = (storeNames = [], mapDispatchToProps) => WrappedComponent => {
    if (!Array.isArray(storeNames)) {
        throw new Error('stateNames must be an array');
    }
    const mapStateToProps = state => {
        const map = {};
        for (let i = 0, length = storeNames.length; i < length; i++) {
            const store = state[storeNames[i]];
            if (!store) {
                console.error(`존재하지 않는 스토어입니다 : ${storeNames[i]}`);
                break;
            }
            map[storeNames[i]] = store;
        }
        return map;
    };

    return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
};