import * as React from 'react';
import {Timeline, Icon, Alert, Spin} from 'antd';
import MarkdownArea from '../../components/markdown/markdown_area';
import { server, CoreTypes } from "../../../utils/global";
const styles = require("../../../styles/main.scss");

export namespace Fragment {
    export interface Props extends React.Props < void > {}
    export interface State {
        fragments: Community.Fragment [];
        loading: boolean;
        failed: boolean
    }
}

export default class Fragment extends React.Component <Fragment.Props,Fragment.State > {

    constructor(props : Fragment.Props) {
        super(props);
        this.state = {
            fragments: [],
            failed: false,
            loading: true,
        }
    }

    loadFragments() {
        const self = this;
        server.query_model({
            model : CoreTypes.QueryType.Fragment,
        }).then(ret=>{
            let fragments : Community.Fragment[] = ret.data as Community.Fragment[];
            self.setState({fragments, loading: false, failed: false});
        }).catch(err=>{
            self.setState({fragments:[], loading: false, failed: true});
        });
    }

    render() {

        const fragments = this.state.fragments;

        return (
            <div className={styles.page_content}>
                {
                    <Timeline>
                        {fragments.map((f)=>(
                            <Timeline.Item
                                key={f.object_id}
                                dot={<i className="fa fa-circle-o" style={{ fontSize: '12px' }} />}
                                color={f.color}>
                                {f.created_at.toLocaleDateString()}
                                <MarkdownArea markdown={f.content} />
                            </Timeline.Item>
                        ))}
                    </Timeline>
                }
                {this.state.loading ? <Spin size="large" /> : null}
                {this.state.failed ? <Alert message="找不到片段" type="error" /> : null}
            </div>
        );
    }
}