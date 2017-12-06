import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { BackTop, Icon } from 'antd';

import Home from './views/pages/home';
import NotFound from './views/pages/not_found';
import Header from './views/components/header';
import Footer from './views/components/footer';
import Post from './views/pages/post';
import Posts from './views/pages/posts';
import User from './views/pages/user';

import * as styles from "./css/main.css";

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div className={styles.main}>
        <Header/>
        <div className={styles.body}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/user/:id" component={User} />
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
        <BackTop className={styles.ant_back_top}>
          <div className={styles.ant_back_top_inner}>
            <Icon type="arrow-up"/>
          </div>
        </BackTop>
        <Footer/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);