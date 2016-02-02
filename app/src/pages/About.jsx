import React from 'react';
import RichTextEditor from '../components/RichTextEditor.jsx';
import Disqus from '../components/Disqus.jsx';
import service from '../service';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    service.test();
  }

  render() {
    return (
      <div>
          此页待装修...
      </div>
    );
  }
}

module.exports = About;
