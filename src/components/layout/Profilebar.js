import React from 'react';
import {Link} from 'react-router';

class Profilebar extends React.Component {
  render() {
    return (
      <div className="profile_bar">
        <Link to="/profile">sample@email.com</Link>
        <Link to="/folders">Alerts</Link>
        <Link to="/tags">New Devotion</Link>
        <Link to="/trash">Search</Link>
      </div>
    );
  }
}

export default Profilebar;