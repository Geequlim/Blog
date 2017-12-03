import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import Home from './views/pages/home';
import NotFound from './views/pages/NotFound';
import Header from './views/components/Header';
import Footer from './views/components/Footer';
import { BackTop, Icon } from 'antd';

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
