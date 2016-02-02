import React from 'react';
import $ from 'jquery';
import app from '../app';
class Disqus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const url = `http://${app.site.disqusShortName}.disqus.com/embed.js`;
    $.ajax({
      type: 'GET',
      url,
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
