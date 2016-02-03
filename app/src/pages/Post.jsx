import React from 'react';
import {Link} from 'react-router';
import MarkdownArea from '../components/MarkdownArea.jsx';
import posts from 'json!yaml!../../data/posts.yaml';
import timeago from '../timeago';
import PostTag from '../components/PostTag.jsx';
import NotFound from './NotFound.jsx';
import Disqus from '../components/Disqus.jsx';
import app from '../app';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.thread = props.params.thread;
    this.post = this.getPostByQuery(this.thread);
    if (this.post && this.post.file) {
      document.title = this.post.title;
      this.post.content = require(`raw!../../data/${this.post.file}`);
    }
  }

  getPostByQuery(query) {
    let post = null;
    if (query && posts && posts.length) {
      posts.map((p) => {
        if (encodeURI(p.publishAt + p.title) === query) {
          post = p;
        }
      });
    }
    return post;
  }

  render() {
    if (!this.post) {
      return <NotFound/>;
    }
    const categories = (
      <span className="ui labels">
        {this.post.categories.map((item) => (
          <PostTag size="small" key={item} query="category">
            {item}
          </PostTag>
        ))}
      </span>
    );
    const tags = (
      <span className="ui tag labels">
        {this.post.tags.map((item) => <PostTag size="small" key={item} query="tag">{item}</PostTag>)}
      </span>
    );
    const curPostIndex = posts.indexOf(this.post);
    let previous = null;
    if (curPostIndex > 0) {
      const post = posts[curPostIndex - 1];
      const thread = encodeURI(encodeURI(post.publishAt + post.title));
      previous = (
        <Link className="ui large blue label nav-label" to={`/post/${thread}`}>
          {post.title}
        </Link>
      );
    }
    let next = null;
    if (curPostIndex >= 0 && curPostIndex < posts.length - 1) {
      const post = posts[curPostIndex + 1];
      const thread = encodeURI(encodeURI(post.publishAt + post.title));
      next = (
        <Link className="ui large blue label nav-label" to={`/post/${thread}`}>
          {post.title}
        </Link>
      );
    }

    return (
      <div className="post-content">
        <div className="post-content ui raised segments">
          <div className="ui segment">
            <h1>{this.post.title}</h1>
            <div className="post-item-header-tags">
              <p>
                <span className="ui label">
                  {app.string.publishAt}{timeago(this.post.publishAt)}
                </span>
              </p>
              <div className="tag-group">{categories}</div>
            </div>
            <div className="ui large label tag-group">{"\t"}{tags}</div>
          </div>
          <div className="ui segment MarkdownArea">
            <MarkdownArea>{this.post.content}</MarkdownArea>
          </div>
          <div className={`ui stacked segment nav-post ${window.innerWidth >= 768 ? 'row' : ''}`}>
            {next}
            {previous}
          </div>
        </div>
        <Disqus thread={this.thread}/>
      </div>
    );
  }
}

module.exports = Post;
