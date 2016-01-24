import React from 'react';
import {Link} from 'react-router';
import PostTage from './PostTag.jsx';
import MarkdownArea from '../components/MarkdownArea.jsx';
import '../timeago';

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const categories = (
      <span className="ui labels">
        {this.props.post.categories.map((item) => (
          <PostTage
            size="small"
            key={item}
            query="category">
            {item}
          </PostTage>
        ))}
      </span>
    );
    const tags = (
      <span className="ui tag labels">
        {this.props.post.tags.map((item) => <PostTage size="small" key={item} query="tag">{item}</PostTage>)}
      </span>
    );

    return (
      <div className="post-item">
        <div className="ui segments">
          <div className="ui segment medium header">{this.props.post.title}</div>
          <div className="ui segment">
            <p>发表于
              {this.props.post.publishAt}</p>
            <div className="tag-group">分类：{categories}</div>
            <div className="tag-group">标签：{tags}</div>
            <div className="pargraph">
              <MarkdownArea>{this.props.post.description}</MarkdownArea>
            </div>
          </div>
          <div className="ui segment">
            <Link
              className="positive ui button"
              to="/post"
              query={{publishAt: this.props.post.publishAt, title: this.props.post.title}}
              >
              阅读全文
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostItem;
