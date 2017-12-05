import * as React from 'react';
const marked = require('marked');
const Prism = require('../../../utils/prism');
import emoji from '../../../utils/emoji';

marked.setOptions({
  highlight: function (code: string, lang: string) {
    const language = Prism.languages[lang];
    return language ? Prism.highlight(code, language) : code;
  }
});

export namespace MarkdownArea {
  export interface Props extends React.Props < void > {
    markdown: string;
  }

  export interface State {
    content: string;
  }
}

export default class MarkdownArea extends React.Component < MarkdownArea.Props, MarkdownArea.State > {

  constructor(props : MarkdownArea.Props) {
    super(props);
    this.state = {
      content: "# Hello **World** !"
    }
  }

  /**
   * 将Markdown渲染为HTML
   * @param markdown Markdown 文本
   */
  private renderMarkdown(markdown: string): string {
    let html = marked(markdown);
    html = emoji(html);
    return html;
  }

  componentWillReceiveProps(nextProps:MarkdownArea.Props) {
    this.setState({ content: this.renderMarkdown(this.props.markdown) });
  }


  componentDidMount() {
    this.setState({ content: this.renderMarkdown(this.props.markdown) });
  }

  render() {
    return (<div dangerouslySetInnerHTML={{__html: marked(this.state.content)}} />);
  }
}
