import React from 'react';
import {Link} from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page fill">
        <div className="home-cover fill">
          <div className="filter">
            <div className="ui large header title center">
              欢迎访问 geequlim.com
            </div>
            <div className="row">
              <Link to="/posts" className="btn btn-raised btn-success">
                <h3><i className="browser icon"></i>进入博客</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Home;
