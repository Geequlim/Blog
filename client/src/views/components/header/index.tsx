import * as React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {config} from '../../../utils/global';

interface Navigator {
  key: string;
  path: string;
  title: string;
  icon: string;
}

const NAVIGATORS: Navigator[] = [
  { key: "home", path: "/", title: "首页", icon: 'home' },
  { key: "posts", path: "/posts", title: "博客", icon: 'solution' },
  { key: "timeline", path: "/timeline", title: "时间轴", icon: 'profile' },
]

export namespace Header {
  export interface Props {}

  export interface State {
    current: string;
    width: number;
  }
}

export default class Header extends React.Component <Header.Props, Header.State > {

  constructor(props?: Header.Props, context?: any) {
    super(props, context);
    this.state = {
      current: "home",
      width: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}) );
  }

  handleClick(e) {
    this.setState({current: e.key});
  }


  render() {
    const mode = (this.state.width < 768) ? "inline" : "horizontal";
    return (
      <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode={mode}>
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
