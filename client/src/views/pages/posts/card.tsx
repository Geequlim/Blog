import * as React from 'react';
import {Link} from 'react-router-dom';
import {Tag, Card } from 'antd';
import MarkdownArea from '../../components/markdown/markdown_area';

export namespace PostCard {
  export interface Props extends React.Props < void > {
      post: Community.Post;
  }
  export interface State {}
}

export default class PostCard extends React.Component < PostCard.Props, PostCard.State > {
  render() {
    return (
        <Card
            style={{margin: 5}}
            title={this.props.post.title}
            key={this.props.post.object_id}
            extra={<Link to={`/post/${this.props.post.object_id}`}>全文</Link>}>

            <MarkdownArea markdown={this.props.post.content.split("<!-- more -->")[0]}/>

        </Card>
    );
  }
}
