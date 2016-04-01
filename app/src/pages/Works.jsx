import React from 'react';
import app from '../app';
import WorkCard from '../components/WorkCard.jsx';
import Loader from '../components/LoadingFlag.jsx';

class Works extends React.Component {
  constructor(props) {
    super(props);
    this.state = {works: app.works};
  }

  render() {
    if (!app.works) {
      return (
        <div className="ui raised stacked segment post-content">
          <Loader>{app.string.loadingWorks}</Loader>
        </div>
      );
    }
    return (
      <div className="ui link cards works">
        { this.state.works.map((work) => <WorkCard {...work} />)}
      </div>
    );
  }
}

module.exports = Works;
