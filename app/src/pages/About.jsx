import React from 'react';
import RichTextEditor from '../components/RichTextEditor.jsx';
import service from '../service';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    service.test();
  }

  render() {
    return (
      <div className="ui fluid container">
        <RichTextEditor placeholder="">
          :apple: :green_apple:
        </RichTextEditor>
        <div className="ds-login"></div>
        <div className="ds-thread" data-thread-key="AboutSite" data-title="About" data-url={window.location.href}></div>
      </div>
    );
  }
}

module.exports = About;
