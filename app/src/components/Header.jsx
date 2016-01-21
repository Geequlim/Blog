import React from 'react';
import site from 'json!yaml!../../data/site.yaml';
import {Link} from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <div className="ui secondary pointing menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/posts">Posts</Link>
          <Link className="item" to="/about">About</Link>
        </div>
      </header>
    );
  }

  renderPageTitle(page) {
    let a = null;
    if (page && page.title) {
      a = (
        <a key={page.title} className="page-link" href={page.url}>
          {page.title}
        </a>
      );
    }
    return a;
  }
}

module.exports = Header;
