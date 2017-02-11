import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import MarkdownArea from '../components/MarkdownArea.jsx';
// import utils from '../../utils';
import helpText from 'raw!./RichEditorHelp.md';
import $ from 'jquery';
require("../emoji");

const insertStr = (str, index, value) => {
  return str.substr(0, index) + value + str.substr(index);
}

class RichTextEditor extends React.Component {
  static propTypes = {
    // 预设文本
    children: React.PropTypes.string,
    // 编辑文本内容回调
    onChange: React.PropTypes.func,
    // 输入框的样式style对象
    inputStyle: React.PropTypes.object,
    // placeholder文本
    placeholder: React.PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      text: props.children ? props.children : '',
      uploadingFile:false,
      curImageUrl: null,
      uploading: false,
      curTextUrl: null
    };
    this.editorId = "editor";
    this.previewerId = "previewer";
    // this.fileUploadId = "file"+ (new Date).getTime() + utils.getRandomInt(0, 9999999);
  }

  componentDidUpdate() {
    $(`#${this.previewerId}`).each((i, d) => $(d).emoji());
  }

  onTextChanged(evt) {
    const text = evt.target.value;
    this.setState({text});
    if(this.props.onChange)
      this.props.onChange(text);
  }

  getText(){
    return this.state.text;
  }

  setText(text){
    this.setState({text});
  }

  getSelection(){
    const posStart = $(`#${this.editorId}`).prop("selectionStart");
    const posEnd = $(`#${this.editorId}`).prop("selectionEnd");
    return [posStart, posEnd];
  }

  boldSelection(){
    this.addMarkToSelection("**","**");
  }
  italicSelection(){
    this.addMarkToSelection("*","*");
  }
  codeSelection(){
    this.addMarkToSelection("`","`");
  }
  fontSizeOne(){
    this.addMarkToSelection("\n","\n---");
  }
  fontSizeTwo(){
    this.addMarkToSelection("\n","\n===");
  }
  horizentalLine(){
    this.addMarkToSelection("","\n\n---");
  }

  numListItem(){
    this.addMarkToSelection("\n1. ","");
  }

  listItem(){
    this.addMarkToSelection("\n- ","");
  }

  quote(){
    this.addMarkToSelection("> ","");
  }

  _insertImage(){
    if(this.state.curImageUrl){
      this.addMarkToSelection("![",`](${this.state.curImageUrl})`);
      this.setState({curImageUrl:null, showImageDialog:false});
    }
  }
  _inserTextUrl(){
    if(this.state.curTextUrl){
      this.addMarkToSelection("[",`](${this.state.curTextUrl})`);
      this.setState({curTextUrl:null, showUrlDialog:false});
    }
  }
  link(){
    this.addMarkToSelection("[","]()");
  }

  addMarkToSelection(frontStr, endStr){
    const [start, end] = this.getSelection();
    let text = this.state.text;
    console.log(start, end, text);
    if(start !== undefined && end !== undefined){
      text = insertStr(text, start, frontStr);
      text = insertStr(text, end + frontStr.length, endStr);
      this.setState({text});
    }
  }

  onImageUrlChanged(evt){
    const url = evt.target.value;
    const expression ="^(https?|ftp)://.*(jpeg|jpg|png|gif|bmp)"
    const regex = new RegExp(expression);
    if (url.match(regex) )
      this.setState({curImageUrl:url});
    else
      this.setState({curImageUrl:null});
  }
  onTextUrlChanged(evt){
    const url = evt.target.value;
    if(url.length>0){
      this.setState({curTextUrl:url});
    }
  }

  uploadFile(){
    // const self = this;
    // self.setState({curImageUrl:null, uploading:true});
    // const fileUploadControl = $(`#${this.fileUploadId}`)[0];
    // utils.uploadFile(fileUploadControl).then((url) => {
    //   console.log("上传成功", url);
    //   self.refs.inputImageUrl.value = url;
    //   self.setState({curImageUrl:url, uploading:false});
    // }).catch((err) => {
    //   self.setState({curImageUrl:null, uploading:false});
    //   console.log("上传失败",err);
    // });
  }

  render() {
    const inputer = (
      <div className="ui form">
        {
          this.state.showImageDialog?(
            <ModalContainer
              onClose={()=>{
                this.setState({curImageUrl:null, uploading: false, showImageDialog: false});
              }}>
              <ModalDialog>
                <div className="column center">
                  <h2>插入图片</h2>
                  <div className={`ui ${this.state.uploading?"loading":""} form column`}>
                    <div style={{maxWidth:"70%", marginTop:10}} className="ui labeled input">
                      <div className="ui label">图片链接</div>
                      <input
                        ref="inputImageUrl"
                        onChange={this.onImageUrlChanged.bind(this)}
                        type="text" placeholder="形如http://xxx.xxx.xx/x.png"/>
                    </div>
                  </div>
                  {
                    this.state.curTextUrl?(
                      <button
                        onClick={this._insertImage.bind(this)}
                        style={{marginTop:10}}
                        className="ui teal button">
                        确定
                      </button>
                    ):null
                  }
                </div>
              </ModalDialog>
            </ModalContainer>
          ):null
        }
        {
          this.state.showUrlDialog?(
            <ModalContainer
              onClose={()=>this.setState({curTextUrl:null, showUrlDialog: false})}>
              <ModalDialog>
                <div className="column center">
                  <h2>插入超链接</h2>
                  <div style={{minWidth:260}}>
                    <div style={{maxWidth:"78%", marginTop:10}} className="ui labeled input">
                      <div className="ui label">链接地址</div>
                      <input
                        onChange={this.onTextUrlChanged.bind(this)}
                        type="text" placeholder="形如http://xxx.xxx.xx/x"/>
                    </div>
                  </div>
                  {
                    this.state.curTextUrl?(
                      <button
                        onClick={this._inserTextUrl.bind(this)}
                        style={{marginTop:10}}
                        className="ui teal button">
                        确定
                      </button>
                    ):null
                  }
                </div>
              </ModalDialog>
            </ModalContainer>
          ):null
        }
        <div style={{maxWidth:'90%', flexWrap:"wrap"}} className="row fillW  center btn-group">
          <button onClick={this.boldSelection.bind(this)} className="btn">
            <i className="bold icon"></i>
          </button>
          <button onClick={this.italicSelection.bind(this)} className="btn">
            <i className="italic icon"></i>
          </button>
          <button onClick={this.fontSizeOne.bind(this)} className="btn">
            <i className="font icon"></i>
          </button>
          <button onClick={this.fontSizeTwo.bind(this)} className="btn">
            <h3><i className="font icon"></i></h3>
          </button>
          <button onClick={this.horizentalLine.bind(this)} className="btn">--</button>
          <button onClick={this.numListItem.bind(this)} className="btn">
            <i className="ordered list icon"></i>
          </button>
          <button onClick={this.listItem.bind(this)} className="btn">
            <i className="unordered list icon"></i>
          </button>
          <button onClick={this.quote.bind(this)} className="btn">
            <i className="indent icon"></i>
          </button>
          <button onClick={this.codeSelection.bind(this)} className="btn">
            <i className="file code outline icon"/>
          </button>
          <button onClick={()=>this.setState({showImageDialog:true})} className="btn">
            <i className="file image outline icon"/>
          </button>
          <button onClick={()=>this.setState({showUrlDialog:true})} className="btn">
            <i className="linkify icon"></i>
          </button>
        </div>
        <textarea
          type="text"
          id={this.editorId}
          className="field rich-editor-content"
          value={this.state.text}
          onChange={this.onTextChanged.bind(this)}
          style={this.props.inputStyle?this.props.inputStyle:null}
          placeholder={this.props.placeholder}/>
      </div>
    );
    const previewer = (
      <div className="rich-editor-content" id={this.previewerId}>
        <MarkdownArea className="rich-editor-content">
          {this.state.text}
        </MarkdownArea>
      </div>
    );
    const helpview = (
      <div className="rich-editor-content">
        <MarkdownArea className="rich-editor-content">
          {helpText}
        </MarkdownArea>
      </div>
    );
    return (
      <div className={this.props.className}>
        <div className="ui top attached tabular secondary pointing menu touchable">
          <div
            onClick={() => this.setState({showPreview: false, showHelp:false})}
            className={`item ${(this.state.showPreview||this.state.showHelp) ? '' : 'active'}`}>
            编辑
          </div>
          <div
            onClick={() => {
              this.setState({showPreview: true, showHelp:false})
            }}
            className={`item ${this.state.showPreview ? 'active' : ''}`}>
            预览
          </div>
          <div
            onClick={() => {
              this.setState({showPreview: false, showHelp:true})
            }}
            className={`item ${this.state.showHelp ? 'active' : ''}`}>
            帮助
          </div>
        </div>
        <div className="ui bottom attached segment">
          <div className="rich-editor-content">
            {this.state.showPreview ? previewer : null}
            {this.state.showHelp? helpview:null}
            {(!this.state.showHelp && !this.state.showPreview)?inputer:null}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = RichTextEditor;
