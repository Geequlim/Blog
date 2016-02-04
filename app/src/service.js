import $ from 'jquery';
class Service {
  constructor() {}
  fetch(url, type = 'GET', dataType = 'JSON', body = '') {
    const promise = new Promise((resolve, reject) => {
      $.ajax({
        type,
        url,
        data: body,
        dataType,
        success: (data) => resolve(data),
        error: (err) => reject(err)
      });
    });
    return promise;
  }

  fetchText(url) {
    const self = this;
    const promise = new Promise(function(resolve, reject) {
      self.fetch(url, 'GET', 'text')
        .then((text) => {
          if (text && text.length && text.indexOf('<!-- geequlim.com -->') === -1) {
            resolve(text);
          } else {
            reject(`Fetch text[${url}] error!`);
          }
        }).catch((err) => reject(err));
    });
    return promise;
  }
}

export default new Service();
