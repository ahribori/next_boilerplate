import { connect } from 'react-redux';
import Clock from './clock';
import Counter from './counter';
import Fetch from './fetch';

function Examples({ lastUpdate, light }) {
    return (
        <div>
            <Clock lastUpdate={lastUpdate} light={light}/>
            <Counter/>
            <Fetch/>
        </div>
    );
}

function mapStateToProps(state) {
    const { lastUpdate, light } = state.example;
    return { lastUpdate, light };
}

export default connect(mapStateToProps)(Examples);