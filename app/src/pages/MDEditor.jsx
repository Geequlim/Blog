import React from 'react';
import {Link} from 'react-router';
import RichTextEditor from '../components/RichTextEditor.jsx';
import app from '../app';
class MDEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="raw fillW fillH">
        <RichTextEditor className="column raw fillW fillH" inputStyle={{minHeight: 300}}></RichTextEditor>
      </div>
    );
  }
}

module.exports = MDEditor;
