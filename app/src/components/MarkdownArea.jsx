import React from 'react';
import marked from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
});
import $ from 'jquery';

class MarkdownArea extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.children);
    // Convert markdown to html
    let content = marked(props.children ? props.children : '');
    // Covert class blocks to divs
    content = content.replace(/<!-- class="(.*)" -->/g, '<div class="$1">');
    content = content.replace(/<!-- endclass -->/g, '</div>');
    this.state = {content};
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
    return (<div className={this.props.className} dangerouslySetInnerHTML={{
      __html: this.state.content
    }}/>);
  }
}

module.exports = MarkdownArea;
