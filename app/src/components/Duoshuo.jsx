import React from 'react';
import $ from 'jquery';

class Duoshuo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    DUOSHUO.EmbedThread($('.ds-thread'));
  }

  render() {
    return (
      <div
        className="ds-thread"
        data-thread-key={this.props.thread}
        data-title={document.title}
        data-url={window.location.href}
      />
    );
  }
}

module.exports = Duoshuo;
