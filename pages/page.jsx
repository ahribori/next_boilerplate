import React from 'react';
import { withRouter } from 'next/router';

@withRouter
class Page extends React.Component {

    static getInitialProps({ pathname, query }) {
        return {
            pathname,
            query,
        };
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>
                    {`Pathname: ${this.props.pathname}`}
                </p>
                <p>
                    {`Query: ${JSON.stringify(this.props.query, null, 2)}`}
                </p>
            </div>
        );
    }
}

export default Page;
