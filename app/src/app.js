import site from 'json!yaml!../data/site.yaml';
import string from 'json!yaml!../data/string.yaml';
import yaml from 'js-yaml';

class App {
  constructor() {
    this.site = site;
    this.string = string;
    fetch('/assets/posts.yaml')
      .then((response) => response.text())
      .then((value) => {
        this.posts = yaml.load(value);
        if (this.onAppStateListener) {
          this.onAppStateListener();
        }
      })
      .catch((err) => console.log(err));
  }

  setOnAppStateChangedListener(callback) {
    this.onAppStateListener = callback;
  }
}
export default new App();
