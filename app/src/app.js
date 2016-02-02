import site from 'json!yaml!../data/site.yaml';
import string from 'json!yaml!../data/string.yaml';

class App {
  constructor() {
    this.site = site;
    this.string = string;
  }
}
export default new App();
