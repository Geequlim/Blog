#!/usr/bin/node
const express = require('express');
const path    = require('path');
const port    = 2502;
const app     = express();

// For static assets
app.use(express.static(__dirname + '/'));

// All response set to index.html
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '', 'index.html'));
});

app.listen(port);
console.log('server started on port ' + port);
