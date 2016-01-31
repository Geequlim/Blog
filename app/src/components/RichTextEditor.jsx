import React from 'react';
import MarkdownArea from '../components/MarkdownArea.jsx';
import $ from 'jquery';

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      text: props.children ? props.children : ''
    };
  }

  componentDidUpdate() {
    $('#previewer').each((i, d) => $(d).emoji());
  }

  onTextChanged(evt) {
    this.setState({text: evt.target.value});
  }

  render() {
    const inputer = (
      <div className="ui form">
        <textarea
          type="text"
          className="field rich-editor-content"
          value={this.state.text}
          onChange={this.onTextChanged.bind(this)}
          placeholder={this.props.placeholder}/>
      </div>
    );
    const previewer = (
      <div className="rich-editor-content" id="previewer">
        <MarkdownArea className="rich-editor-content">
          {this.state.text}
        </MarkdownArea>
      </div>
    );
    return (
      <div className={this.props.className}>
        <div className="ui top attached tabular secondary pointing menu touchable">
          <div
            onClick={() => this.setState({showPreview: false})}
            className={`item ${this.state.showPreview ? '' : 'active'}`}>
            编辑
          </div>
          <div
            onClick={() => {
              this.setState({showPreview: true})
            }}
            className={`item ${this.state.showPreview ? 'active' : ''}`}>
            预览
          </div>
        </div>
        <div className="ui bottom attached segment">
          <div className="rich-editor-content">
            {this.state.showPreview ? previewer : inputer}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = RichTextEditor;
