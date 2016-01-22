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
    let publistAt = new Date(this.props.post.publishAt);
    publistAt = `${publistAt.getFullYear()}年${publistAt.getMonth()+1}月${publistAt.getDate()}日 ${publistAt.getHours()}:${publistAt.getMinutes()}:${publistAt.getSeconds()}`;

    return (
      <div className="post-item">
        <div className="ui segments">
          <div className="ui segment large header">{this.props.post.title}</div>
          <div className="ui segment">
            <p>发表于 {publistAt}</p>
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
