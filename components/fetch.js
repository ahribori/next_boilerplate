import React from 'react';
import { connect } from 'react-redux';
import { fetch } from '../store/Example';

class Fetch extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (!this.props.fetch) {
            await this.props.fetchRequest();
            const { success } = this.props.fetch;

        }
    }

    render() {
        return (
            <div>{this.props.fetch ? JSON.stringify(this.props.fetch, null, 2) : 'Pending...'}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { fetch: state.example.fetch };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequest: () => dispatch(fetch()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);

