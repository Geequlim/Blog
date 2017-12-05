import * as React from 'react';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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
        <ul className={style.block}>
          <li>111111</li>
          <li>222222</li>
        </ul>
        <ul className={style.block}>
          <li>3333333</li>
          <li>4444444</li>
        </ul>
    </div>
    );
  }
}
