import React from 'react';
import allPosts from 'json!yaml!../../data/posts.yaml';
import PostItem from '../components/PostItem.jsx';
import PostTagPanel from '../components/PostTagPanel.jsx';
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: this.getPosts()};
  }

  getPosts() {
    let posts = [];
    const {query} = this.props.location;
    if (query.tag) {
      for (let i = 0; i < allPosts.length; i++) {
        const curPost = allPosts[i];
        if (curPost.tags.indexOf(query.tag) !== -1) {
          posts.push(curPost);
        }
      }
    } else if (query.category) {
      for (let i = 0; i < allPosts.length; i++) {
        const curPost = allPosts[i];
        if (curPost.categories.indexOf(query.category) !== -1) {
          posts.push(curPost);
        }
      }
    } else {
      posts = allPosts;
    }
    return posts;
  }

  render() {
    return (
      <div className="posts-page">
        <PostTagPanel />
        <div className="posts-list">
          {this.state.posts.map((post) => {
            const address = `/post?publishAt=${post.publishAt}&title=${post.title}`;
            return <PostItem key={address} post={post}/>;
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
