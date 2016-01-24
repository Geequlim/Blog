import React from 'react';
import HotLink from './HotLink.jsx';

class PostTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.buttonColors = [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'teal',
      'blue',
      'violet',
      'purple',
      'pink',
      'brown',
      'grey',
      'black'
    ];
    this.color = this.buttonColors[Math.floor(Math.random() * this.buttonColors.length)];
    if (props.query === 'category') {
      this.query = {'category': this.props.children};
    } else if (props.query === 'tag') {
      this.query = {'tag': this.props.children};
    }
    this.size = '';
    if (props.size) {
      this.size = props.size;
    }
  }

  render() {
    return (
      <span>
        <HotLink
          className={`ui ${this.color} ${this.size} label tag-label`}
          to="/posts"
          query={this.query}>
          {this.props.children}
        </HotLink>
      </span>
    );
  }
}

export default PostTag;
