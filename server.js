const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    routes = require('./api/routes'),
    path = require('path'),
    port = process.env.PORT || 8000;

const config = require('./api/config.json');

//Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Blogdb');

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.frontUrl);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Cors
app.use(cors({origin: config.frontUrl}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit:'100Mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {  }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.components = {};
//controllers
const PostController = require('./api/controllers/posts');
const CommentController = require('./api/controllers/comments');
const userComponent = require('./api/components/user');
const auth = require('./api/components/auth');

PostController(app);
userComponent(app);
routes(app);
auth(app);

app.use( express.static( __dirname + '/uploads' ) );

app.get('/api', (req, res) => {
    res.send('API is running');
});

const server = app.listen(port, () => {
    const address = server.address(),
     host = address.address,
     port = address.port;
     console.error('Server started at %s:%s', host, port);
});

const sockets = require('./api/sockets');
sockets(app, server);