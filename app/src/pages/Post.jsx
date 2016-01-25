import React from 'react';
import marked from 'marked';
import MarkdownArea from '../components/MarkdownArea.jsx';
import posts from 'json!yaml!../../data/posts.yaml';
import timeago from '../timeago';
import PostTag from '../components/PostTag.jsx';

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
    return (
      <div className="post-content ui stacked raised segments">
        <div className="ui segment">
          <h1>{this.post.title}</h1>
            <div className="post-item-header-tags">
              <p>
                <span className="ui label">
                    发表于{timeago(this.post.publishAt)}
                </span>
              </p>
              <div className="tag-group">{categories}</div>
            </div>
            <div className="ui large label tag-group">{"\t"}{tags}</div>
        </div>
        <div className="ui segment MarkdownArea">
          <MarkdownArea>{this.post.content}</MarkdownArea>
        </div>
      </div>
    );
  }
}

module.exports = Post;
