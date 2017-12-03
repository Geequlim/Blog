import * as React from 'react';

import { Timeline } from 'antd';
import MarkdownArea from '../../components/Markdown/MarkdownArea';

export namespace Snapshots {
  export interface Props extends React.Props < void > {
  }

  export interface State {
  }
}

export default class Snapshots extends React.Component <Snapshots.Props,Snapshots.State> {

  render() {
    return (
      <Timeline>
        <Timeline.Item color="green">
          2017-12-03
          <MarkdownArea markdown="Hello World:apple:\n ![](http://ww4.sinaimg.cn/large/005Xtdi2gw1f1qn89ihu3j315o0dwwjc.jpg)"/>
        </Timeline.Item>
        <Timeline.Item color="green">
          2015-09-01
          <br/>
          Create a services site
        </Timeline.Item>
      </Timeline>
    );
  }
}
