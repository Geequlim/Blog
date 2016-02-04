import React from 'react';
import Disqus from '../components/Disqus.jsx';
import RichTextEditor from '../components/RichTextEditor.jsx';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="post-content">
        <RichTextEditor></RichTextEditor>
      </div>
    );
  }
}

module.exports = About;
