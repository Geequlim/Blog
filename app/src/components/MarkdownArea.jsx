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
    this.state ={content: props.children ? this._getParsedText(props.children) : ''}
  }

  _getParsedText(text=""){
    // Convert markdown to html
    let content = marked(text);
    // Covert class blocks to divs
    content = content.replace(/<!-- class="(.*)" -->/g, '<div class="$1">');
    content = content.replace(/<!-- endclass -->/g, '</div>');
    return content;
  }

  // 设置文本内容
  setContentText(text=""){
    const content = this._getParsedText(text);
    this.setState({content});
    this._loadStyle();
  }

  // 加载高亮代码
  _highlightCode() {
    if (this.props.children.indexOf('```') !== -1) {
      const els = document.querySelectorAll('pre code');
      for (let i = 0; i < els.length; i++) {
        window.hljs.highlightBlock(els[i]);
      }
    }
  }

  // 重新加载样式
  _loadStyle(){
    this._highlightCode();
    $('table').addClass('panel table table-striped table-hover');
    // $('th').addClass('ui center aligned');
    $('img').addClass('ui centered rounded bordered image');
    $('.markediv').each((i, d) => $(d).emoji());
  }

  componentDidMount() {
    this._loadStyle();
  }

  render() {
    return (<div className={`${this.props.className} markediv`} dangerouslySetInnerHTML={{
      __html: this.state.content
    }}/>);
  }
}

module.exports = MarkdownArea;
