import React from 'react';
import marked from 'marked';
import $ from 'jquery';

class MarkdownArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  highlightCode() {
    if (this.props.children.indexOf('```') !== -1) {
      const els = document.querySelectorAll('pre code');
      for (let i = 0; i < els.length; i++) {
        window.hljs.highlightBlock(els[i]);
      }
    }
  }

  componentDidMount() {
    this.highlightCode();
    $('table').addClass('ui celled collapsing striped table');
    $('th').addClass('ui center aligned');
    $('img').addClass('ui centered rounded bordered image');
  }

  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={{__html: marked(this.props.children)}}
      />
    );
  }
}

module.exports = MarkdownArea;
