import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { startClock, serverRenderClock, fetch } from '../store/Example';
import Examples from '../components/examples';
import { Link } from '../routes';

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
            <div>
                <Examples/>
                <ul>
                    <Link route={'page'} params={{ id: 123 }}>
                        <a>
                            <li>Hello world</li>
                        </a>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default withRouter(connect()(Index));