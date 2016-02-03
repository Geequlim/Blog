import React from 'react';
import allPosts from 'json!yaml!../../data/posts.yaml';
import PostItem from '../components/PostItem.jsx';
import PostTagPanel from '../components/PostTagPanel.jsx';
import app from '../app';
import {Link} from 'react-router';
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.getPosts()
    };
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
    const postPerPage = app.site.postPerPage;
    this.pages = Math.ceil(posts.length / postPerPage);
    this.curPage = (query.page && query.page <= this.pages) ? query.page : 1;
    posts = posts.slice((this.curPage - 1) * postPerPage, this.curPage * postPerPage);
    return posts;
  }

  render() {
    console.log("curpage", this.curPage);
    const pageNavigators = [];
    for (let i = 1; i <= this.pages; i++) {
      const query = JSON.parse(JSON.stringify(this.props.location.query));
      query.page = i;
      pageNavigators.push(
        <Link
          key={i}
          className={`${i == this.curPage ? 'active' : ''} item`}
          to="/posts"
          query={query}>
          {i}
        </Link>
      );
    }
    return (
      <div className="posts-page">
        <PostTagPanel/>
        <div className="posts-list">
          {this.state.posts.map((post) => {
            const address = `/post?publishAt=${post.publishAt}&title=${post.title}`;
            return <PostItem key={address} post={post}/>;
          })}
          {
            this.pages > 1 ? (
              <div className="pagination">
                <div className="ui pagination menu">
                  {pageNavigators.map((p) => p)}
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default Posts;
