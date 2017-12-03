import * as React from 'react';
import {Actions as TodoActions} from '../../../reducers/todos';
import {Button, DatePicker} from 'antd';
// // import 'antd/dist/antd.css';

export namespace NotFound {
  export interface Props extends React.Props < void > {}
  export interface State {}
}

export default class Home extends React.Component < NotFound.Props, NotFound.State > {
  render() {
    return (
      <div>
        404 Page Not Found
      </div>
    );
  }
}
