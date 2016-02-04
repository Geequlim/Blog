import React from 'react';

class LoadingFlag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.size = props.size ? props.size : '';
  }

  render() {
    return (
      <div className="ui active inverted dimmer">
        <div className={`ui ${this.size} text loader`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = LoadingFlag;
