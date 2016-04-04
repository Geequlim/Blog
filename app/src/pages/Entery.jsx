import React from 'react';

require('../emoji');
require('../material');
require('../ripples');
import $ from 'jquery';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SidePanel from '../components/SidePanel.jsx';
import Home from "./Home.jsx";

class Entery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeigh: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      const windowHeigh = window.innerHeight;
      this.setState({windowWidth, windowHeigh});
    });
    // Replace emoji to images
    $('.content').each((i, d) => $(d).emoji());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    let leftSidePanel = null;
    if (this.state.windowWidth >= 1024) {
      leftSidePanel = <SidePanel width={this.state.windowHeigh}/>;
    }
    return (
      <div className="content">
        <Header path={this.props.location.pathname} {...this.state}/>
          { this.props.location.pathname === '/'?
            <Home/>:
            <div className="main-body">
              <div className="page-body">{this.props.children}</div>
            </div>
          }
        <Footer {...this.state}/>
      </div>
    );
  }
}

export default Entery;
