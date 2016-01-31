import React from 'react';
import site from 'json!yaml!../../data/site.yaml';
import {Link} from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeigh: window.innerHeight,
      toggleMobileMenu: false
    };
  }

  asMobilePhone() {
    return this.state.windowWidth < 768;
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      const windowHeigh = window.innerHeight;
      this.setState({windowWidth, windowHeigh});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const getItemStyle = (routeName) => {
      let className = 'item';
      if (!this.asMobilePhone()) {
        const curRot = this.props.path;
        if (curRot === routeName || (curRot !== '/' && routeName.indexOf(curRot) !== -1)) {
          className += ' active';
        }
      }
      return className;
    };

    const menu = (
      <div className="ui stackable secondary pointing menu">
        <Link className={getItemStyle('/')} to="/">
          {this.asMobilePhone() ? <i className="home icon"/> : null}
          {this.asMobilePhone() ? 'Home' : site.title}
        </Link>
        <Link className={getItemStyle('/posts')} to="/posts">
          <i className="newspaper icon"></i>
          Blog
        </Link>
        <Link className={getItemStyle('/about')} to="/about">
          <i className="info icon"></i>
          About
        </Link>
        <div className="right item">
          <div className="ui icon input">
            <input className="st-default-search-input" type="text" placeholder="Search..."/>
            <i className="search icon"></i>
          </div>
        </div>
      </div>
    );
    const mobileMenu = (
      <div className="touchable">
        <div className="ui secondary menu">
          <Link className="item" to="/">{site.title}</Link>
          <a
            onClick={() => this.setState({toggleMobileMenu: !this.state.toggleMobileMenu})}
            onTab={() => this.setState({toggleMobileMenu: !this.state.toggleMobileMenu})}
            className="right item">
            <i className={`${this.state.toggleMobileMenu ? 'close' : 'sidebar'} icon`}/>
          </a>
        </div>
        {this.asMobilePhone() && this.state.toggleMobileMenu ? menu : null}
      </div>
    );

    return this.asMobilePhone() ? mobileMenu : menu;
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
