import React from 'react';
import RichTextEditor from "../components/RichTextEditor.jsx";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ui fluid container">
        <RichTextEditor placeholder="">
          :apple: :green_apple:
        </RichTextEditor>
      </div>
    );
  }
}

module.exports = About;
