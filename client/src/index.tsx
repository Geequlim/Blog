import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import Todos from './views/pages/TodoMVC';
import Home from './views/pages/home';
import NotFound from './views/pages/NotFound';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/todos" component={Todos} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
