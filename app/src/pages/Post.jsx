import React from 'react';
import marked from 'marked';
import MarkdownArea from '../components/MarkdownArea.jsx';
import posts from 'json!yaml!../../data/posts.yaml';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
});

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

  render() {
    return (
      <div className="post-content ui stacked raised segments">
        <div className="ui segment">
          <h1>{this.post.title}</h1>
        </div>
        <div className="ui segment">
          <MarkdownArea>{this.post.content}</MarkdownArea>
        </div>

      </div>
    );
  }
}

module.exports = Post;
