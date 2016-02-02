import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import NotFound from './pages/NotFound.jsx';
import Entery from './pages/Entery.jsx';
import Search from './pages/Search.jsx';
import {Router, Route, IndexRoute} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import site from 'json!yaml!../data/site.yaml';
// import Duoshuo from 'duoshuo';

// const duoshuo = new Duoshuo({
//   short_name: 'geequlim.duoshuo.com', // 站点申请的多说二级域名。
//   secret: 'f74e18973353a92750a7757249008b91', // 站点密钥
//   sso: {
//     login: 'http://geequlim.com/login/', // 替换为你自己的回调地址
//     logout: 'http://geequlim.com/logout/' // 替换为你自己的回调地址
//   }
// });
//

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.history = createHistory({queryKey: false});
  }

  onRouteUpdate() {
    // update hole page when route updated
    this.setState({location: window.location});
    switch (window.location.pathname) {
      case '/posts':
        document.title = 'Blog';
        break;
      case '/about':
        document.title = 'About';
        break;
      case '/':
        document.title = site.title;
        break;
      default:
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
          <Route path="search" component={Search}></Route>
          <Route path="about" component={About}></Route>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById('app'));
