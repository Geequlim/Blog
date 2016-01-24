import React from 'react';
import allPosts from 'json!yaml!../../data/posts.yaml';
import PostTag from './PostTag.jsx';

class PostTagPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.categories = this.getTags('categories');
    this.tags = this.getTags('tags');
  }

  getTags(name) {
    let tags = [];
    for (let i = 0; i < allPosts.length; i++) {
      tags = [...tags, ...(allPosts[i][name])];
    }
    return [...(new Set(tags))];
  }

  render() {
    return (
      <div className="right-panel">
        <div className="ui segments">
          <h3 lassName="ui segment">Categories</h3>
          <div className="ui segment ui labels tag-group">
            <PostTag key="all">All</PostTag>
            {this.categories.map((item) => <PostTag key={item} query="category">{item}</PostTag>)}
          </div>
        </div>
        <div className="ui segments">
          <h3 lassName="ui segment">Tags</h3>
          <div className="ui segment tag-group tag labels">
            <PostTag key="all">All</PostTag>
            {this.tags.map((item) => <PostTag key={item} query="tag">{item}</PostTag>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostTagPanel;
