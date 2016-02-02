import React from 'react';
import app from '../app';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  asMobilePhone() {
    return this.state.windowWidth < 768;
  }

  render() {
    return (
      <div className="footer">
        <div className={`footer-container ${window.innerWidth < 768 ? '' : 'row'}`}>
          <div className="first">
            <p className="title inline">{app.site.title}</p>
            <p className="subtitle">{app.site.subtitle}</p>
          </div>
          <div className="medium">
            <p>{app.site.description}</p>
          </div>
          <div className="last">
            <div>
              <img className="ui right spaced mini avatar image" src={app.site.author.avatar}/>
              <h3 className="subtitle inline">{app.string.contact}{app.site.author.name}</h3>
            </div>
            <div className="center">
              { app.site.author.github_username ?
                (
                  <p className="ui label icon-btn">
                    <a href={`https://github.com/${app.site.author.github_username}`}>
                      <i className="big github icon"/>
                    </a>
                  </p>
                ) : null
              }
              { app.site.author.email ?
                (
                  <p className="ui teal label icon-btn">
                    <a href={`mailto:${app.site.author.email}`}>
                      <i className="big mail icon"/>
                    </a>
                  </p>
                ) : null
              }
              { app.site.author.twitter_username ?
                (
                  <p className="ui blue label icon-btn">
                    <a href={`https://twitter.com/${app.site.author.twitter_username}`}>
                      <i className="big twitter icon"/>
                    </a>
                  </p>
                ) : null
              }
              { app.site.author.weibo_userpage && app.site.author.weibo_username ?
                (
                  <p className="ui red label icon-btn">
                    <a href={app.site.author.weibo_userpage}>
                      <i className="big weibo icon"/>
                    </a>
                  </p>
                ) : null
              }
            </div>
          </div>
        </div>
        <p>&copy; 2016 geequlim.com | Powered by <a href="https://github.com/Geequlim/Blog">Blog</a></p>
      </div>
    );
  }
}

export default Footer;
