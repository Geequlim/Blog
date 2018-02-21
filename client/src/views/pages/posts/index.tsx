import * as React from 'react';
import { Alert, Spin, Tag, Card, Pagination } from 'antd';
import {Link} from 'react-router-dom';
import { queryString, server} from "../../../utils/global";
import PostCard from "./card";
import * as CoreTypes from '../../../utils/server/typedef';
const styles = require("../../../styles/main.scss");

const PAGE_SIZE = 6;

enum LoadingState {
    LOADING,
    DONE,
    FAILED
}

export namespace Posts {
  export interface Props extends React.Props < void > {}
  export interface State {
     posts: CoreTypes.Model[];
     total: number;
     page: number;
     page_size: number;
     loading_state: LoadingState;
  }
}

export default class Posts extends React.Component < Posts.Props, Posts.State > {

    private params:  CoreTypes.PostQuery;

    constructor(props: Posts.Props) {
        super(props);
        let p : any = props;

        this.params = queryString.parse(window.location.search) as CoreTypes.PostQuery;
        this.params.model = CoreTypes.QueryType.Post;

        this.state = {
            posts: [],
            page: this.params.page ? this.params.page : 1,
            page_size: 5,
            total: 0,
            loading_state: LoadingState.LOADING,
        };
        const self = this;

        p.history.listen((location, action) => {
            self.loadPosts();
        });
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        const self = this;

        this.params = queryString.parse(window.location.search) as CoreTypes.PostQuery;
        this.params.model = CoreTypes.QueryType.Post;
        this.params.page_size = PAGE_SIZE;

        server.query_model(this.params).then(r=>{
            self.setState({posts: r.data, loading_state: LoadingState.DONE, page: r.page, total: r.total, page_size: r.page_size})
        }).catch(e=>{
            self.setState({ posts: [], loading_state: LoadingState.FAILED});
            console.error(e);
        });
    }

    onPageChanged(page, pageSize) {
        const props: any = this.props;
        const params = {
            ...(this.params),
            page: page,
            page_size: this.state.page_size,
        }
        const self = this;
        this.setState({ page, loading_state: LoadingState.LOADING }, ()=>{
            props.history.push(`/posts?${queryString.stringify(params)}`);
            self.loadPosts();
        });
    }

    renderNotFound() {
        return (<Alert className={styles.flex_column_fill} message="找不到文章" type="error" />);
    }


    render() {
        let content = null;
        if (this.state.loading_state == LoadingState.LOADING) {
            content = <Spin className={styles.flex_column_fill} size="large" />;
        } else if (this.state.loading_state == LoadingState.FAILED) {
            content = this.renderNotFound();
        } else if (this.state.loading_state == LoadingState.DONE) {
            content = (
                <div className={styles.flex_column_fill}>
                    <div className={styles.flex_column_fill}>
                        {this.state.posts.map((p: Community.Post) => <PostCard key={p.object_id} post={p} /> )}
                    </div>
                </div>
            );
        }
        return (
        <div className={styles.page_content}>
            {content}
            <div style={{alignSelf: 'center', margin: 5}}>
                <Pagination
                    onChange={this.onPageChanged.bind(this)}
                    current={this.state.page}
                    pageSize={this.state.page_size}
                    total={this.state.total}
                    defaultCurrent={this.state.page}
                />
            </div>
        </div>
        );
    }
}
