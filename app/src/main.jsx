import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Posts from './pages/Posts.jsx';
import Post from './pages/Post.jsx';
import {Router, Route, IndexRoute} from 'react-router';

let curRouteName = '/';

class Entery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {windowWidth: window.innerWidth};
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      this.setState({windowWidth});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div>
        <Header curRoute={curRouteName} {...this.state} />
        <div className="content">{this.props.children}</div>
        <Footer {...this.state} />
      </div>
    );
  }
}

const handleEnterPage = (p) => {
  curRouteName = p.location.pathname;
  console.log('current route name', curRouteName);
};

const router = (
  <Router>
    <Route path="/" onEnter={handleEnterPage} component={Entery}>
      <IndexRoute onEnter={handleEnterPage} component={Home}/>
      <Route path="posts" onEnter={handleEnterPage} component={Posts}></Route>
      <Route path="post" onEnter={handleEnterPage} component={Post}></Route>
      <Route path="about" onEnter={handleEnterPage} component={About}></Route>
    </Route>
  </Router>
);

ReactDOM.render(router, document.getElementById('app'));
