import React from 'react';
import Disqus from '../components/Disqus.jsx';
import Duoshuo from '../components/Duoshuo.jsx';
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="post-content">
        此页待装修...
        <Disqus thread="1234567"/>
      </div>
    );
  }
}

module.exports = About;
