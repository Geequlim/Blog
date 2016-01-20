import React from 'react';

class IconLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <p>
        <span className="icon">
          <this.props.icon/>
        </span>
        <a href={this.props.href}>
          {this.props.children}
        </a>
      </p>
    );
  }
}

module.exports = IconLink;
