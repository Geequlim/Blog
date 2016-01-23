import React from 'react';
import MarkdownArea from '../components/MarkdownArea.jsx';
import '../timeago';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <span>
          <a href={`/posts?${this.props.query}=${this.props.children}`}>
            {this.props.children}
          </a>
        </span>
    );
  }
}

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const categories = (
      <span>
        {this.props.post.categories.map((item) => <Tag key={item} query="category">{item}</Tag>)}
      </span>
    );
    const tags = (
      <span>
        {this.props.post.tags.map((item) => <Tag key={item} query="tag">{item}</Tag>)}
      </span>
    );

    return (
      <div className="post-item">
        <div className="ui segments">
          <div className="ui segment medium header">{this.props.post.title}</div>
          <div className="ui segment">
            <p>发表于 {this.props.post.publishAt}</p>
            <div>分类：{categories}</div>
            <div>标签：{tags}</div>
            <MarkdownArea>{this.props.post.description}</MarkdownArea>
          </div>
          <div className="ui segment">
            <a className="positive ui button" href={this.props.link}>阅读全文</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostItem;
