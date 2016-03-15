import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import NotFound from './pages/NotFound.jsx';
import Entery from './pages/Entery.jsx';
import Search from './pages/Search.jsx';
import Tweets from './pages/Tweets.jsx';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import app from './app';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createHistory({queryKey: false});
    app.setOnAppStateChangedListener(this.forceUpdateApp.bind(this));
  }

  forceUpdateApp() {
    const location = (new Date()).getTime() + Math.random();
    this.setState({location});
  }

  onRouteUpdate() {
    // update hole page when route updated
    const location = window.location;
    this.setState({location});
    switch (window.location.pathname) {
      case '/posts':
        document.title = app.string.blog;
        break;
      case '/tweets':
        document.title = app.string.tweets;
        break;
      case '/about':
        document.title = app.string.about;
        break;
      case '/':
      default:
        document.title = app.site.title;
        break;
    }
  }

  render() {
    return (
      <Router
        key={this.state.location}
        history={this.history}
        onUpdate={this.onRouteUpdate.bind(this)}>
        <Route path="/" component={Entery}>
          <IndexRoute component={Home}/>
          <Route path="posts" component={Posts}></Route>
          <Route path="post/:thread" component={Post}></Route>
          <Route path="tweets" component={Tweets}></Route>
          <Route path="search" component={Search}></Route>
          <Route path="about" component={About}></Route>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById('app'));
