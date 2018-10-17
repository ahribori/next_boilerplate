import React from 'react';

export default WrappedComponent => {
    return class WithUserAgent extends React.Component {
        static getInitialProps({ req }) {
            const isServer = !!req;
            const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
            return {
                isServer,
                userAgent,
            }
        }

        constructor(props) {
            super(props);
        }

        render() {
            return (
                <WrappedComponent userAgent={this.props.userAgent} {...this.props} />
            )
        }

    }
}
