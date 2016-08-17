import site from 'json!yaml!../data/site.yaml';
import string from 'json!yaml!../data/string.yaml';
import yaml from 'js-yaml';
import pinyin from 'pinyin';
import service from './service';

class App {
  constructor() {
    this.site = site;
    this.string = string;
    this.posts = null;
    this.works = null;
    service.fetchText('/assets/posts.yaml')
      .then((value) => {
        this.posts = yaml.load(value);
        if (this.onAppStateListener) {
          this.onAppStateListener();
        }
      })
      .catch((err) => console.log(err));

    service.fetchText('/assets/works.yaml')
      .then((value) => {
        this.works = yaml.load(value);
        if (this.onAppStateListener) {
          this.onAppStateListener();
        }
      })
      .catch((err) => { console.log(err);})
  }

  setOnAppStateChangedListener(callback) {
    this.onAppStateListener = callback;
  }

  encodeURI(text) {
    const letters = pinyin(text, {style: pinyin.STYLE_NORMAL, heteronym: false, segment: false});
    let url = "";
    for (let i = 0; i < letters.length; i++) {
      url = url + letters[i]
    }
    return encodeURI(url.replace(/[^a-zA-Z0-9]+/g, "-"));
  }
}
export default new App();
