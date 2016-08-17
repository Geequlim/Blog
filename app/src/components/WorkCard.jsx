import React from 'react';
import {Link} from 'react-router';
import app from '../app';

class WorkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let workid = app.encodeURI(this.props.id);
    return (
      <Link className="card column" to={`/work/${workid}`}>
        <div className="imgbg fill">
          <div className="image">
            <img src={this.props.logo}/>
          </div>
        </div>
        <div className="title_content">
          <div className="ui small header center">{this.props.title}</div>
        </div>
      </Link>
    );
  }
}

module.exports = WorkCard;
