import React from 'react';
import {Link} from 'react-router';
import PostTag from './PostTag.jsx';
import MarkdownArea from '../components/MarkdownArea.jsx';
import app from '../app';
import timeago from '../timeago';
import Loader from '../components/LoadingFlag.jsx';
import service from '../service';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    service.fetchText(this.props.post.file)
      .then((content) => {
        if (content && content.length && content.indexOf(app.site.end_description) !== -1) {
          const description = content.substring(0, content.indexOf(app.site.end_description));
          this.setState({description});
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const categories = (
      <span className="ui labels">
        {this.props.post.categories.map((item) => (
          <PostTag size="small" key={item} query="category">
            {item}
          </PostTag>
        ))}
      </span>
    );
    const tags = (
      <span className="ui tag labels">
        {this.props.post.tags.map((item) => <PostTag size="small" key={item} query="tag">{item}</PostTag>)}
      </span>
    );

    const thread = app.encodeURI(this.props.post.title);
    return (
      <div className="well">
            <Link to={`/post/${thread}`}>
              <h2>{this.props.post.title}</h2>
            </Link>
            <div className="post-item-header-tags">
              <p>
                <span className="ui label">
                    {app.string.publishAt}{timeago(this.props.post.publishAt)}
                </span>
              </p>
              <div className="tag-group">{categories}</div>
            </div>
          <div className="tag-group">{tags}</div>
          <div className="pargraph">
            {this.state.description ? (
              <MarkdownArea>{this.state.description}</MarkdownArea>
            ) : (
              <div className="ui message">
                <div className="content">
                  <br/><br/><br/>
                  <Loader>{app.string.loadingPostContent}</Loader>
                </div>
              </div>
            )}
          </div>
          <Link
            to={`/post/${thread}`}>
            <div className="btn btn-raised btn-success">
              {app.string.readMore}
            </div>
          </Link>
      </div>
    );
  }
}

module.exports = PostItem;
