import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Profilebar from './layout/Profilebar';

class App extends React.Component{
  render(){
    return (
      <div className="main-wrapper">
        <div className="profile-wrapper">
          <Profilebar />
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps){
  return{
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);