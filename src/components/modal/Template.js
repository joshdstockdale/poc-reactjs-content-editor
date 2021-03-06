import React from 'react';
import {Link} from 'react-router';

class Template extends React.Component {
  render() {
    return (
      <div className="reveal" id="exampleModal1" data-reveal>
        <h1>Template</h1>
        <p className="lead">Your couch. It is mine.</p>
        <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
        <button className="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default Template;