require('./models/db');

const express = require('express');
const path    = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const employeeController = require('./controllers/employeeController');
var router = express.Router();
var app    = express();

// for the form request body parser
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

// set view engine
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs( { extname: 'hbs', defaultLayout: 'mainlayout', layoutsDir: __dirname + '/views/layouts/'} ) );
app.set('view engine', 'hbs');

//server create
app.listen(4000, () => {
    console.log('Express server started at port : 4000');

});

//load employee controller 
app.use('/employee', employeeController);