import React from 'react';
import {Link} from 'react-router';
import MarkdownArea from '../components/MarkdownArea.jsx';
import PostTagPanel from '../components/PostTagPanel.jsx';
import timeago from '../timeago';
import PostTag from '../components/PostTag.jsx';
import Disqus from '../components/Disqus.jsx';
import app from '../app';
import Loader from '../components/LoadingFlag.jsx';
import service from '../service';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
    this.thread = props.params.thread;
    this.post = this.getPostByQuery(this.thread);
    if (this.post && this.post.file) {
      document.title = this.post.title;
      service.fetchText(this.post.file)
        .then((content) => this.setState({content}))
        .catch((err) => console.log(err));
    } else {
      this.notFound = app.posts !== null;
    }
  }

  getPostByQuery(query) {
    let post = null;
    if (query && app.posts && app.posts.length) {
      app.posts.map((p) => {
        if (app.encodeURI(p.id) === query) {
          post = p;
        }
      });
    }
    return post;
  }
  render() {
    if (this.notFound) {
      return <div className="ui red message">{app.string.postNotFound}</div>;
    }
    if (!app.posts) {
      return (
        <div className="ui raised stacked segment post-content">
          <Loader>{app.string.loadingPost}</Loader>
        </div>
      );
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
    const curPostIndex = app.posts.indexOf(this.post);
    let previous = null;
    if (curPostIndex > 0) {
      const post = app.posts[curPostIndex - 1];
      const thread = app.encodeURI(post.id);
      previous = (
        <Link to={`/post/${thread}`}>
          <p className="btn btn-raised btn-info">{post.title}→</p>
        </Link>
      );
    }
    let next = null;
    if (curPostIndex >= 0 && curPostIndex < app.posts.length - 1) {
      const post = app.posts[curPostIndex + 1];
      const thread = app.encodeURI(post.id);
      next = (
        <Link to={`/post/${thread}`}>
          <p className="btn btn-raised btn-info">←{post.title}</p>
        </Link>
      );
    }

    document.title = this.post.title;
    return (
      <div className="posts-page">
        <div className="post-right-panel">
          <PostTagPanel/>
        </div>
        <div className="column fill">
          <div className="post-content well">
              <h1>{this.post.title}</h1>
              <div className="post-item-header-tags">
                <p>
                  <span className="ui label">
                    {app.string.publishAt}{timeago(this.post.publishAt)}
                  </span>
                </p>
                <div className="tag-group">{categories}</div>
              </div>
              <div className="tag-group">{"\t"}{tags}</div>
            <div className="MarkdownArea">
              {
                this.state.content ? (
                  <MarkdownArea>{this.state.content}</MarkdownArea>
                ) : <Loader size="big">{app.string.loadingPostContent}</Loader>
              }
            </div>
            <div className={`nav-post ${window.innerWidth >= 768 ? 'row' : ''}`}>
              {next}
              {previous}
            </div>
          </div>
          {this.state.content ?(
            <div className="well">
              <h2>文章评论</h2>
              <Disqus  thread={this.thread}/>
            </div>
            ): null
          }
        </div>
      </div>
    );
  }
}

module.exports = Post;
