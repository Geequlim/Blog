import React from 'react';
import PostTag from './PostTag.jsx';
import app from '../app';
class PostTagPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (app.posts) {
      this.categories = this.getTags('categories');
      this.tags = this.getTags('tags');
    } else {
      this.categories = null;
      this.tags = null;
    }
  }

  getTags(name) {
    let tags = [];
    for (let i = 0; i < app.posts.length; i++) {
      tags = [...tags, ...(app.posts[i][name])];
    }
    return [...(new Set(tags))];
  }

  render() {
    return (
      <div className="right-panel">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">{app.string.postCategories}</h3>
          </div>
          <div className="panel-body tag-group tag labels">
            <PostTag key="all">{app.string.all}</PostTag>
            {this.categories ?
              (this.categories.map((item) => <PostTag key={item} query="category">{item}</PostTag>)) : null
            }
          </div>
        </div>
        <div className="panel panel-danger">
          <div className="panel-heading">
            <h3 className="panel-title">{app.string.tags}</h3>
          </div>
          <div className="panel-body tag-group tag labels">
            <PostTag key="all">{app.string.all}</PostTag>
            {this.tags ? (this.tags.map((item) => <PostTag key={item} query="tag">{item}</PostTag>)) : null}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PostTagPanel;
