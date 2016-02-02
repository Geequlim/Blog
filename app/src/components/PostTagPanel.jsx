import React from 'react';
import allPosts from 'json!yaml!../../data/posts.yaml';
import PostTag from './PostTag.jsx';
import app from '../app';
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
          <h3 lassName="ui segment">{app.string.categories}</h3>
          <div className="ui segment ui labels tag-group">
            <PostTag key="all">{app.string.all}</PostTag>
            {this.categories.map((item) => <PostTag key={item} query="category">{item}</PostTag>)}
          </div>
        </div>
        <div className="ui segments">
          <h3 lassName="ui segment">{app.string.tags}</h3>
          <div className="ui segment tag-group tag labels">
            <PostTag key="all">{app.string.all}</PostTag>
            {this.tags.map((item) => <PostTag key={item} query="tag">{item}</PostTag>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostTagPanel;
