import React from 'react';
import posts from 'json!yaml!../../data/posts.yaml';
import PostItem from '../components/PostItem.jsx';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // return (
  //   <li key={address}><a href={address}></a></li>
  // );
  render() {
    return (
      <div className="post-list">
          {posts.map((post) => {
            const address = `#/post?publishAt=${post.publishAt}&title=${post.title}`;
            return <PostItem key={address} link={address} post={post}/>;
          })}
      </div>
    );
  }
}

export default Posts;
