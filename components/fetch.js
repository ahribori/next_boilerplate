import React from 'react';
import { connect } from 'react-redux';
import { fetch } from '../store/Example';

class Fetch extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
      await this.props.fetchRequest();
      console.log(this.props.fetch.data)
  }

  render() {
    return (
        <div>{ this.props.fetch ? JSON.stringify(this.props.fetch.data, null, 2) : 'Pending...' }</div>
    )
  }
}

const mapStateToProps = (state) => {
    return { fetch: state.example.fetch };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequest: () => dispatch(fetch())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);

