import React from 'react';
import Disqus from '../components/Disqus.jsx';
import RichTextEditor from '../components/RichTextEditor.jsx';
import MarkdownArea from '../components/MarkdownArea.jsx';
import Loader from '../components/LoadingFlag.jsx';
import app from '../app';
import service from '../service.js';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    let self = this;
    service.fetchText('/assets/about.md')
      .then((value) => self.setState({aboutText: value}))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="post-content">
        <div className="ui segment MarkdownArea">
          {
            this.state.aboutText ? (
              <div className="MarkdownArea">
                <MarkdownArea>{this.state.aboutText}</MarkdownArea>
              </div>
            ) : <Loader size="big">{app.string.loading}</Loader>
          }
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">给我留言</h3>
          </div>
          <div className="panel-body">
            <Disqus thread="AboutSite"/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = About;
