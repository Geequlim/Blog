import * as React from 'react';
import { Alert, Spin, Tag, Card, Pagination } from 'antd';
import {Link} from 'react-router-dom';
import { queryString, server} from "../../../utils/global";
import MarkdownArea from '../../components/markdown/markdown_area';
import * as CoreTypes from '../../../utils/server/typedef';

export namespace Posts {
  export interface Props extends React.Props < void > {}
  export interface State {
     params: CoreTypes.PostQuery;
     posts: CoreTypes.Model[];
     page: number;
     page_count: number;
     loading: boolean;
     failed: boolean;
  }
}

export default class Posts extends React.Component < Posts.Props, Posts.State > {
    constructor(props: Posts.Props) {
        super(props);
        let p : any = props;
        const params: CoreTypes.PostQuery = queryString.parse(p.location.search);
        params.model = CoreTypes.QueryType.Post;
        this.state = {
            params,
            posts: [],
            page: params.page ? params.page : 1,
            page_count: 1,
            loading: true,
            failed: false
        };
    }

    componentDidMount() {
        const self = this;
        server.query_model(this.state.params).then(r=>{
            self.setState({ posts: r.data, failed: false, loading: false, page: r.page, page_count: r.page_count})
        }).catch(e=>{
            self.setState({ posts: [], failed: true, loading: false})
        });
    }

    renderPosts(posts: CoreTypes.Model[]) {
        return (
            <div>
                {posts.map((post: Community.Post) => {
                    return (
                        <Card key={post.object_id} title={post.title} extra={ <Link to={`/post/${post.object_id}`}>全文</Link>}>

                            <MarkdownArea markdown={post.content.split("<!-- more -->")[0]}/>

                        </Card>
                    );
                })}
                {posts.length? (
                    <Pagination size="small" defaultCurrent={this.state.page} total={this.state.page_count} />
                ):null}
            </div>
        );
    }

    renderNotFound() {
        return (<Alert message="找不到文章" type="error" />);
    }


    render() {
        return (
        <div>
            {this.state.loading ? <Spin size="large" /> : null}
            {this.state.posts.length ? this.renderPosts(this.state.posts) : null}
            {this.state.failed ? this.renderNotFound() : null}
        </div>
        );
    }
}
