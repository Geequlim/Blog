import * as React from 'react';
import {Link} from 'react-router-dom';
import {Tag, Card } from 'antd';
import MarkdownArea from '../../components/markdown/markdown_area';
import * as moment from 'moment';
moment.locale('zh-cn');
export namespace PostCard {
  export interface Props extends React.Props < void > {
      post: Community.Post;
  }
  export interface State {}
}

export default class PostCard extends React.Component < PostCard.Props, PostCard.State > {

    render() {
        const post = this.props.post;
        return (
            <Card
                style={{margin: 5}}
                title={post.title}
                key={post.object_id}
                extra={<Link to={`/post/${post.object_id}`}>全文</Link>}>

                <MarkdownArea markdown={post.content.split("<!-- more -->")[0]}/>
                <div>
                    <Tag style={{borderStyle: 'dashed' }}>{moment(post.created_at).calendar()}</Tag>
                    {post.tags.map(tag=> (
                        <Tag key={tag} color="blue"><Link to={`/posts?tag=${tag}`}>{tag}</Link></Tag>
                    ))}
                </div>
            </Card>
        );
    }
}
