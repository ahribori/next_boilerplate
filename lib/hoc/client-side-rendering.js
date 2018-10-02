import React from 'react';

export default (WrappedComponent) => {
    return class ClientSideRenderingComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                render: false,
            };
        }

        componentDidMount() {
            this.setState({ render: true });
        }

        render() {
            return this.state.render ?
                <WrappedComponent {...this.props} /> : null;

        }
    };
}