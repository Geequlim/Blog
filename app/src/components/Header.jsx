import React from 'react';
import site from 'json!yaml!../../data/site.yaml';
import {Link} from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const getItemStyle = (routeName) => {
      let className = 'item';
      const curRot = this.props.curRoute;
      if (curRot === routeName || (curRot !== '/' && routeName.indexOf(curRot) !== -1)) {
        className += ' active';
      }
      return className;
    };

    return (
      <div className="ui secondary attached menu">
        <Link className={getItemStyle('/')} to="/">Home</Link>
        <Link className={getItemStyle('/posts')} to="/posts">Posts</Link>
        <Link className={getItemStyle('/about')} to="/about">About</Link>
      </div>
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
