import * as React from 'react';
import { Alert, Spin, Tag, Card } from 'antd';
import { Link } from "react-router-dom";
import MarkdownArea from '../../components/markdown/markdown_area';
import {CoreTypes, server} from '../../../utils/global';
const styles = require("../../../styles/main.scss");
import * as moment from 'moment';
moment.locale('zh-cn');

export namespace Post {
  export interface Props extends React.Props < void > {
      match: any;
  }
  export interface State {
      post: Community.Post;
      loading: boolean,
      failed: boolean,
  }
}

export default class Post extends React.Component < Post.Props, Post.State > {

  constructor(params: Post.Props) {
      super(params);
      this.state = {
          post: null,
          loading: true,
          failed: false,
      }
  }



  componentDidMount() {
    const self = this;
    console.log("start load post:", this.props.match.params.id);
    server.fetch_model(CoreTypes.ModelType.Post, this.props.match.params.id)
        .then((post: Community.Post) => {
            self.setState({
                post: post,
                loading: false,
                failed: false
            });
            console.log("load done");

        }).catch(err => {
            self.setState({
                post: null,
                loading: false,
                failed: true
            });
            console.log("load failed");
        });
  }

  renderNotFound() {
    return (<Alert message="找不到文章" type="error" />);
  }

  renderContent(content: any) {
    return (window.innerWidth >= 720) ? (<Card>{content}</Card>): content;
  }

  renderPost(post: Community.Post) {
        const self = this;
        return (
            <div className={styles.flex_column_fill} style={{padding: '1em'}}>
                {this.renderContent(
                    (<div>
                        <div>
                            <h1>{post.title}</h1>
                            <Tag style={{borderStyle: 'dashed' }}>{moment(post.created_at).calendar()}</Tag>
                            {post.tags.map(tag=> (
                                <Tag key={tag} color="blue"><Link to={`/posts?tag=${tag}`}>{tag}</Link></Tag>
                            ))}
                    </div>
                    <hr/>
                    <MarkdownArea markdown={post.content} />
                    </div>)
                )}
            </div>
        );
  }

  render() {
    return (
      <div className={styles.page_content}>
        {this.state.loading ? <Spin size="large" /> : null}
        {this.state.post ? this.renderPost(this.state.post) : null}
        {this.state.failed ? this.renderNotFound() : null}
      </div>
    );
  }
}
