# Atom , The best way to code
## I love this editor

I fall in love with Atom when I first use it

You know, it is the best way to code. Just like this

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import {Router, Route, IndexRoute} from 'react-router';

class Entery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="content">{this.props.children}</div>
        <Footer/>
      </div>
    );
  }
}

const router = (
  <Router>
    <Route path="/" component={Entery}>
      <IndexRoute component={Home}/>
      <Route path="/" component={Home}></Route>
      <Route path="about" component={About}></Route>
    </Route>
  </Router>
);

ReactDOM.render(router, document.getElementById('app'));ReactDOM.render(router);ReactDOM.render(router, document.getElementById('app'));ReactDOM.render(router);ReactDOM.render(router);ReactDOM.render(router, document.getElementById('app'));ReactDOM.render(router);ReactDOM.render(router);ReactDOM.render(router, document.getElementById('app')); ReactDOM.render(router);
```

```c++
#include <cstring>
int int main(int argc, char const *argv[]) {
  /* code */
  return 0;
}
```

---

Here are some awesome plugins can make me code easier:
<h2>Here!</h2>
