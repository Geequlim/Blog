import React from 'react';
import {Link} from 'react-router';

class HotLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Link {...this.props}
        onClick={() => window.location.reload()}>
        {this.props.children}
      </Link>
    );
  }
}

module.exports = HotLink;
