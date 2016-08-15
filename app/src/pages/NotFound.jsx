import React from 'react';
import {Link} from 'react-router';
import app from '../app'
class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="raw fill center not-found">
        <img src="/assets/images/404.svg"/>
        <div className="message-box">
          <h1>404</h1>
          <h3>{app.string.pageNotFound}</h3>
          <div className="buttons-con">
            <div className="action-link-wrap">
              <a onClick={()=>history.back(-1)} className="link-button link-back-button">{app.string.back}</a>
              <Link to="/" className="link-button">{app.string.back2home}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = NotFound;
