import React from 'react';
import app from '../app';
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
          <div className="title">
            {this.asMobilePhone() ? <i className="home icon"/> : null}
            {this.asMobilePhone() ? app.string.home : app.site.title}
          </div>
        </Link>
        <Link className={getItemStyle('/posts')} to="/posts">
          <div className="title">
            <i className="browser icon"></i>
            {app.string.blog}
          </div>
        </Link>
        <Link className={getItemStyle('/works')} to="/works">
          <div className="title">
            <i className="cubes icon"></i>
            {app.string.works}
          </div>
        </Link>
        <Link className={getItemStyle('/tweets')} to="/tweets">
          <div className="title">
            <i className="spy icon"></i>
            {app.string.tweets}
          </div>
        </Link>
        <Link className={getItemStyle('/about')} to="/about">
          <div className="title">
            <i className="info circle icon"></i>
            {app.string.about}
          </div>
        </Link>
        {/*
          <div className="right item">
            <div className="ui inverted icon input">
              <input
                className="st-default-search-input"
                type="text"
                placeholder={app.string.search}
              />
              <i className="search icon"></i>
            </div>
          </div>
        */}

      </div>
    );
    const mobileMenu = (
      <div className="touchable">
        <div className="ui secondary menu">
          <Link className="item" to="/"><p className="title">{app.site.title}</p></Link>
          <a
            onClick={() => this.setState({toggleMobileMenu: !this.state.toggleMobileMenu})}
            onTab={() => this.setState({toggleMobileMenu: !this.state.toggleMobileMenu})}
            className="right item">
            <p className="title">
              <i className={`${this.state.toggleMobileMenu ? 'close' : 'sidebar'} icon`}/>
            </p>
          </a>
        </div>
        {this.asMobilePhone() && this.state.toggleMobileMenu ? menu : null}
      </div>
    );

    return (
      <div className="header-panel">
        {this.asMobilePhone() ? mobileMenu : menu}
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
