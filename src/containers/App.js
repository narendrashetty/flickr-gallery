import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import TopBar from '../components/TopBar';

export const App = React.createClass({
  
  componentWillMount() {
    this.props.actions.fetchRecentPhotos();
  },

  render() {
    return (
      <div>
        <TopBar location={this.props.location} />
        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);