//utilities
const bodyParser = require('body-parser');
const path = require('path');
const cons = require('consolidate');

//server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//database
const database = require('./server/persistence/mysql');

//passport

//routes
const api = require('./server/routes/api');
app.use('/api', api);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



server.listen(process.env.PORT || 3000, () => {
    console.log('listening 3000');
  });