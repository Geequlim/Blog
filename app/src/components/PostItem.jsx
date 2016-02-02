import React from 'react';
import {Link} from 'react-router';
import PostTag from './PostTag.jsx';
import MarkdownArea from '../components/MarkdownArea.jsx';
import app from '../app';
import timeago from '../timeago';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const content = require(`raw!../../data/${this.props.post.file}`);
    if (content && content.length && content.indexOf(app.site.end_description) !== -1) {
      this.description = content.substring(0, content.indexOf(app.site.end_description));
    } else {
      this.description = '';
    }
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

    const thread = encodeURI(encodeURI(this.props.post.publishAt + this.props.post.title));
    return (
      <div className="post-item">
        <div className="ui raised segments">
          <div className="ui segment">
            <h2 className="ui medium header">
              {this.props.post.title}
            </h2>
            <div className="post-item-header-tags">
              <p>
                <span className="ui label">
                    {app.string.publishAt}{timeago(this.props.post.publishAt)}
                </span>
              </p>
              <div className="tag-group">{categories}</div>
            </div>
          </div>
          <div className="ui segment">
            <div className="tag-group">{tags}</div>
            <div className="pargraph">
              <MarkdownArea>{this.description}</MarkdownArea>
            </div>
          </div>
          <div className="ui segment">
            <Link
              className="positive ui button"
              to={`/post/${thread}`}>
              {app.string.readMore}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostItem;
