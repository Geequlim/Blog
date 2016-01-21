import React from 'react';
import posts from 'json!yaml!../../data/posts.yaml';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(posts);
  }

  render() {
    return (
      <div>
        <ul>
          {posts.map((post) => {
            const address = `#/post?publishAt=${post.publishAt}&title=${post.title}`;
            return (
              <li key={address}><a href={address}>{post.title}</a></li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Posts;
