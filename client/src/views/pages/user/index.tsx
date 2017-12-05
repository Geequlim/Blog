import * as React from 'react';

export namespace User {
  export interface Props extends React.Props < void > {}
  export interface State {}
}

export default class User extends React.Component < User.Props, User.State > {
  render() {
    return (
      <div>
        User
      </div>
    );
  }
}
