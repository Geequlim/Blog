import * as React from 'react';
import {Tabs, Input} from 'antd';
const TabPane = Tabs.TabPane;
const TextArea = Input.TextArea;
import MarkdownArea from "./markdown_area";

export const TAB_EDIT = "TAB_EDIT";
export const TAB_PREVIEW = "TAB_PREVIEW";
export const TAB_HELP = "TAB_HELP";
const HELP_TEXT = require("./grammar.md");

export namespace MarkdownEdit {
  export interface Props extends React.Props < void > {
    markdown?: string;
  }
  export interface State {
    content: string;
  }
}

export default class MarkdownEdit extends React.Component < MarkdownEdit.Props, MarkdownEdit.State > {

  private input: any;

  constructor(props : MarkdownEdit.Props) {
    super(props);
    this.state = {
      content: props.markdown ? props.markdown : ""
    }
  }

  private _onTextChanged(event: any) {
    this.setState({ content: event.target.value });
  }

  private _onTabChanged() {
    this.setState({ content: this.getTextContent() });
  }

  /**
   * 获取输入的文本内容
   *
   * @returns {string} Markdown文本
   * @memberof MarkdownArea
   */
  public getTextContent():string  {
    const input : any = this.refs.input;
    return input.textAreaRef.value;
  }

  render() {
    return (
      <Tabs defaultActiveKey={TAB_EDIT} onChange={this._onTabChanged.bind(this)}>
        <TabPane tab="编辑" key={TAB_EDIT}>
          <TextArea
            ref="input"
            autosize={{minRows: 5, maxRows: 10}}
            defaultValue={this.props.markdown}
            onChange={this._onTextChanged.bind(this)}
          />
        </TabPane>
        <TabPane tab="预览" key={TAB_PREVIEW}>
          <MarkdownArea markdown={this.state.content} />
        </TabPane>
        <TabPane tab="帮助" key={TAB_HELP}>
          <MarkdownArea markdown={HELP_TEXT} />
        </TabPane>
      </Tabs>
    );
  }
}
