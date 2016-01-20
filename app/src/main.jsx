import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import {Router, Route, IndexRoute} from 'react-router';

class Entery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="content">{this.props.children}</div>
        <Footer/>
      </div>
    );
  }
}

const router = (
  <Router>
    <Route path="/" component={Entery}>
      <IndexRoute component={Home}/>
      <Route path="/" component={Home}></Route>
      <Route path="about" component={About}></Route>
    </Route>
  </Router>
);

ReactDOM.render(router, document.getElementById('app'));
