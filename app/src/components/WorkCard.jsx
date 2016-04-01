import React from 'react';
import {Link} from 'react-router';



class WorkCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    let workid = encodeURI(this.props.title);
    return (
      <Link className="card" to={`/work/${workid}`}>
        <div className="imgbg">
          <div className="image">
            <img src={this.props.logo}/>
          </div>
        </div>
        <div className="content">
          <div className="header">{this.props.title}</div>
        </div>
      </Link>
    );
  }
}

module.exports = WorkCard;
