import * as React from 'react';
import { Alert, Spin, Tag, Card, Pagination } from 'antd';
import {Link} from 'react-router-dom';
import { queryString, server} from "../../../utils/global";
import PostCard from "./card";
import * as CoreTypes from '../../../utils/server/typedef';
const styles = require("../../../styles/main.scss");

const PAGE_SIZE = 5;

export namespace Posts {
  export interface Props extends React.Props < void > {}
  export interface State {
     params: CoreTypes.PostQuery;
     posts: CoreTypes.Model[];
     total: number;
     page: number;
     page_size: number;
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
            page_size: 5,
            total: 0,
            loading: true,
            failed: false
        };
        this.loadPosts();
    }

    loadPosts() {
        const self = this;
        this.state.params.page_size = this.state.page_size;
        server.query_model(this.state.params).then(r=>{
            self.setState({posts: r.data, failed: false, loading: false, page: r.page, total: r.total, page_size: r.page_size})
        }).catch(e=>{
            self.setState({ posts: [], failed: true, loading: false})
        });
    }

    onPageChanged(page, pageSize) {
        const props: any = this.props;
        const params = {
            ...(this.state.params),
            page: page,
            page_size: this.state.page_size,
        }
        const self = this;
        this.setState({ params, page, loading: true }, ()=>{
            props.history.push(`/posts?${queryString.stringify(params)}`);
            self.loadPosts();
        });
    }

    renderNotFound() {
        return (<Alert message="找不到文章" type="error" />);
    }


    render() {
        return (
        <div className={styles.page_content}>
            {this.state.loading ? <Spin size="large" /> : null}
            {this.state.posts.length ? (
                <div className={styles.flex_column_fill}>
                    <div className={styles.flex_column_fill}>
                        {this.state.posts.map((p: Community.Post) => <PostCard key={p.object_id} post={p} /> )}
                    </div>
                    <div className={styles.flex_column} style={{alignSelf: 'center', margin: 5}}>
                        <Pagination
                            onChange={this.onPageChanged.bind(this)}
                            current={this.state.page}
                            pageSize={this.state.page_size}
                            total={this.state.total}
                            defaultCurrent={this.state.page}
                        />
                    </div>

                </div>
            ) : null}
            {this.state.failed ? this.renderNotFound() : null}
        </div>
        );
    }
}
