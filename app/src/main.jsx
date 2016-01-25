import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import NotFound from './pages/NotFound.jsx';
import Entery from './pages/Entery.jsx';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/lib/createHashHistory';
// import createHistory from 'history/lib/createBrowserHistory';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createHistory({queryKey: false});
  }

  onRouteUpdate() {
    // update hole page when route updated
    this.setState({location: window.location});
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
          <Route path="post" component={Post}></Route>
          <Route path="about" component={About}></Route>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById('app'));
