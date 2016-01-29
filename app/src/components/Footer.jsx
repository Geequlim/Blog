import React from 'react';
import site from 'json!yaml!../../data/site.yaml';

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
      <div className={`footer ${window.innerWidth < 768 ? '' : 'row'}`}>
        <div className="info">
          <p className="ui medium header">{site.title}</p>
          <p className="ui small header">{site.subtitle}</p>
        </div>
        <div className="info">
          <p>Find {site.author.name} in social network</p>
          { site.author.email ?
            (
              <p>
                <i className="mail icon"/>
                <a href={`mailto:${site.author.email}`}>{site.author.email}</a>
              </p>
            ) : null
          }
          { site.author.github_username ?
            (
              <p className="ui label">
                <i className="github icon"/>
                <a href={`https://github.com/${site.author.github_username}`}>
                  {site.author.github_username}
                </a>
              </p>
            ) : null
          }
          { site.author.twitter_username ?
            (
              <p className="ui blue label">
                <i className="twitter icon"/>
                <a href={`https://twitter.com/${site.author.twitter_username}`}>
                  {site.author.github_username}
                </a>
              </p>
            ) : null
          }
          { site.author.weibo_userpage && site.author.weibo_username ?
            (
              <p className="ui red label">
                <i className="weibo icon"/>
                <a href={site.author.weibo_userpage}>
                  {site.author.weibo_username}
                </a>
              </p>
            ) : null
          }
        </div>
        <div className="column">
          <p>{site.description}</p>
        </div>
      </div>
    );
  }
}

export default Footer;
