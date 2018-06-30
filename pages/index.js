import React from 'react';
import { connect } from 'react-redux';
import { startClock, serverRenderClock, fetch } from '../store/Example';
import Examples from '../components/examples';

class Index extends React.Component {
    static async getInitialProps({ reduxStore, req }) {
        const isServer = !!req;
        reduxStore.dispatch(serverRenderClock(isServer));
        await reduxStore.dispatch(fetch());
        return {};
    }

    componentDidMount() {
        const { dispatch } = this.props;
        this.timer = startClock(dispatch);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <Examples/>
        );
    }
}

export default connect()(Index);