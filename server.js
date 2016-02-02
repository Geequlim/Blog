const express = require('express');
const path = require('path');
const port = process.env.PORT || 1088;
const app = express();

// For static assets
app.use(express.static(__dirname + '/'));

// All response set to index.html
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '', 'index.html'));
});

app.all('*', function(req, res, next) {
  res.set({
    'Access-Control-Allow-origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Methods': 'GET'
  });
  next();
});

app.listen(port);
console.log('server started on port ' + port);
