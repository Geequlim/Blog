import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SidePanel from '../components/SidePanel.jsx';
require('../emoji');
import $ from 'jquery';

class Entery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth;
      this.setState({windowWidth});
      const windowHeigh = window.height;
      this.setState({windowHeigh});
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
        <Header {...this.state}/>
        <div className="main-body">
          <div className="page-body">
            {this.props.children}
          </div>
        </div>
        <Footer {...this.state}/>
      </div>
    );
  }
}

export default Entery;
