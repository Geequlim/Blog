import $ from 'jquery';
class Service {
  constructor() {}
  test() {
    $.ajax({
      url: 'http://api.duoshuo.com/users/profile.jsonp?user_id=11204349&callback=?',
      dataType: 'jsonp',
      success: function(data) {
        console.log('JSONP=====>', data);
      }
    });
    const request = new Request('http://api.duoshuo.com/users/profile.json?user_id=11204349', {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request)
      .then((r) => r.json())
      .then((v) => console.log('JSON ---->', v))
      .catch((err) => console.log(err));
  }
}

export default new Service();
