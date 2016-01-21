import React from 'react';
import ReactMarkdown from 'react-markdown';
import posts from 'json!yaml!../../data/posts.yaml';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    const {query} = props.location;
    this.post = this.getPostByQuery(query);
    if (this.post && this.post.file) {
      this.post.content = require(`raw!../../data/${this.post.file}`);
    }
  }

  getPostByQuery(query) {
    let post = null;
    if (query && posts && posts.length) {
      posts.map((p) => {
        if (query.title === p.title && query.publishAt === p.publishAt) {
          post = p;
        }
      });
    }
    return post;
  }

  highlightCode() {
    if (this.post.content.indexOf('```') !== -1) {
      const els = document.querySelectorAll('pre code');
      for (let i = 0; i < els.length; i++) {
        window.hljs.highlightBlock(els[i]);
      }
    }
  }

  componentDidMount() {
    this.highlightCode();
  }

  render() {
    return (
      <div>
        <h2>{this.post.title}</h2>
        <ReactMarkdown source={this.post.content}/>
      </div>
    );
  }
}

module.exports = Post;
