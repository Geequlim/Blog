import React from 'react';
import marked from 'marked';

const renderer = new marked.Renderer();
const defaultCode = renderer.code;
renderer.code = (code, language) => {
  if (language === '@mermaid') {
      let html = "";
      var cb = (svgGraph) => {
        html = `<div>${svgGraph}</div>`;
      };
      if(mermaid.parse(code)) {
        mermaid.mermaidAPI.render('mermaid',code,cb);
        while(html.length == 0)
          continue;
      }
      return `<div>${html}</div>`;
  } else {
    return (new marked.Renderer()).code(code, language);
  }
};

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
});
import $ from 'jquery';
require("../emoji");

class MarkdownArea extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      content: props.children ? this._getParsedText(props.children) : '',
      outlines: []
    }
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

  // 加载outline
  _loadOutline() {
    const elements = $(".markediv").find("*")
    for (let i = 0; i < elements.length; i++) {
      const e = $(elements[i]);
      if(["H1","H2","H3","H4","H5","H6"].indexOf(elements[i].tagName) != -1) {
        e.attr("id",e.text());
        this.state.outlines.push(e);
      }
    }
    if( this.props.onOutlineLoaded ) {
      this.props.onOutlineLoaded(this.state.outlines);
    }
  }
  // 加载mermaid图标
  _loadMermaid() {
    mermaid.init({noteMargin: 10}, ".mermaid");
  }

  componentDidMount() {
    this._loadMermaid();
    this._loadStyle();
    this._loadOutline();
  }

  render() {
    return (<div className={`${this.props.className} markediv`} dangerouslySetInnerHTML={{
      __html: this.state.content
    }}/>);
  }
}

module.exports = MarkdownArea;
