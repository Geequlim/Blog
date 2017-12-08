import * as React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';

import MarkdownEidt from '../../components/markdown/markdown_eidt';
import {server, CoreTypes} from "../../../utils/global";
const styles = require("../../../styles/main.scss");

export namespace Home {
    export interface Props extends React.Props < void > {}

    export interface State {}
}

export default class Home extends React.Component < Home.Props, Home.State > {
    render() {
        return (
            <div className={styles.flex_column_fill}>
            <div className={`${styles.flex_column_fill} ${styles.home_cover}`}>
                <div className={styles.home_filter}>
                <div style={{ textAlign: 'center', color: '#fff' , fontSize: '2em' }}>
                    欢迎访问 geequlim.com
                </div>
                <div className="row">

                    <Link to="/posts" className="btn btn-raised btn-success">
                        进入博客
                    </Link>
                </div>
                </div>
            </div>
            </div>
        );
    }
}
