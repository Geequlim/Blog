import React from 'react';
import app from '../app.js';
import Timeline from '../components/TwitterTimeline.jsx';
class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="column fill">
        <Timeline
          username={app.site.author.twitter_username}
          widgetId={app.site.author.twitter_embedded_id}
          tagLine={app.string.tweetsTagLine}>
        </Timeline>
      </div>
    );
  }
}

module.exports = Tweets;
