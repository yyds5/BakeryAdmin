const express = require('express');
const bodyParser = require('body-parser')
const path=require('path');

var index = require('./routes/index');
var products = require('./routes/products');
var orders = require('./routes/orders');




const app = express();
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

//set static folder to route to all angular files
app.use(express.static(path.join(__dirname, 'admin')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api', products);
app.use('/api', orders);


var port = 3000;

app.listen(port, function(){console.log("Running on "+port)})
