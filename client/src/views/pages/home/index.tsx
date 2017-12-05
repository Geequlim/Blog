import * as React from 'react';
import {Button, DatePicker} from 'antd';
import {Link} from 'react-router-dom';

import MarkdownEidt from '../../components/Markdown/MarkdownEidt';
import Snapshots from '../Snapshots';
import {server, types} from "../../../utils/global";
export namespace Home {
    export interface Props extends React.Props < void > {}

    export interface State {}
}

export default class Home extends React.Component < Home.Props, Home.State > {
    render() {
        server.query_model({
            model: types.QueryType.User,
            keyword: "Geer",
        }).then(r=>console.log(r)).catch(e=>console.error(e));
        return (
            <div>
                <Button>
                    <Link to="/todos">TODO MVC</Link>
                </Button>
                <Button>
                    <Link to="/404">404</Link>
                </Button>
                <DatePicker/>
                <MarkdownEidt markdown="He*ll*o"/>
                <Snapshots/>
            </div>
        );
    }
}
