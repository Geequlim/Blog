import * as React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {config} from '../../../utils/global';
const styles = require("../../../styles/main.scss");

interface Navigator {
  key: string;
  path: string;
  title: string;
  icon: string;
}

const NAVIGATORS: Navigator[] = [
  { key: "home", path: "/", title: "首页", icon: 'home' },
  { key: "posts", path: "/posts", title: "博客", icon: 'solution' },
  { key: "fragments", path: "/fragments", title: "时间轴", icon: 'profile' },
]

export namespace Header {
  export interface Props {
    history: any
  }

  export interface State {
    current: string;
    width: number;
  }
}

export default class Header extends React.Component <Header.Props, Header.State > {

  constructor(props?: Header.Props, context?: any) {
    super(props, context);
    let p : any = props;

    this.state = { current: this.parseCureent(), width: window.innerWidth }
    const self = this;
    p.history.listen((location, action) => {
        self.setState({current: self.parseCureent()});
    });
  }

  parseCureent() {
    let current = window.location.pathname.replace('/', '');
    if(!current) current = "home";
    if(current.startsWith("post")) current = "posts";
    return current;
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}) );
  }

  render() {
    const mode = (this.state.width < 768) ? "inline" : "horizontal";
    return (
      <Menu
        className={styles.dark_area}
        theme="dark"
        selectedKeys={[this.state.current]} mode={mode}>
        {
          (mode == 'inline') ? (
            <SubMenu key="mobile_sub" title={<span><Icon type="home" /><span>{config.title}</span></span>}>
              { NAVIGATORS.map( n => <Menu.Item key={n.key}><Link to={n.path}><Icon type={n.icon}/>{n.title}</Link></Menu.Item>) }
            </SubMenu>
          ) : (NAVIGATORS.map( n => <Menu.Item key={n.key}><Link to={n.path}><Icon type={n.icon}/>{n.title}</Link></Menu.Item>))
        }
      </Menu>
    );
  }
}
