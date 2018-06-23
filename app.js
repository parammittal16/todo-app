var express = require('express');
var toController = require('./controllers/todoController');


var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

toController(app);

app.listen(3000);

console.log('hi');