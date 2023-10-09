var express = require('express');
var app = express();

var port = 2002;
  
app.listen(port, function () {
    console.log('teest me');
});

app.get('/', (request, response) => {
    response.send("hello there");
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ a: 1 }));
});



