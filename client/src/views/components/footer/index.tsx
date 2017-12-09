import * as React from 'react';
import * as style from "./style.css";

export namespace Footer {
  export interface Props {}

  export interface State {}
}

export default class Footer extends React.Component <Footer.Props, Footer.State > {

  constructor(props?: Footer.Props, context?: any) {
    super(props, context);
  }


  render() {
    return (
      <div className={style.footer}>
        © 2017 Geequlim.
      </div>
    );
  }
}
