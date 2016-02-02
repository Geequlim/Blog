import React from 'react';
import $ from 'jquery';
class Disqus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const disqusShortname = 'geequlim';
    $.ajax({
      type: 'GET',
      url: `http://${disqusShortname}.disqus.com/embed.js`,
      dataType: 'script',
      cache: true
    });
  }
  render() {
    return (
      <div id="disqus_thread"></div>
    );
  }
}

module.exports = Disqus;
