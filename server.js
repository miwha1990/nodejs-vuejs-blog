const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    routes = require('./api/routes'),
    port = process.env.PORT || 8000;

const cors = require('cors');
const config = require('./api/config.json');
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
app.use( express.static( __dirname + '/public/dist' ) );
app.get('*', function ( req, res) {
    // uri has a forward slash followed any number of any characters except full stops (up until the end of the string)

        res.sendFile(__dirname + '/public/dist/index.html');

});/*express.static(__dirname + '/public/dist')*/
app.get('/api', (req, res) => {
    res.send('API is running');
});
const server = app.listen(port, () => console.log(`API server started on: http://localhost:${port}/api`));
const io = require('socket.io')(server);
app.get('/onlineUsers', (req,res,next) => {res.send(people)});
const people = {};
io.on('connection', (socket) => {

    socket.on("join", function(name, avatar){

        if(!people[socket.id]){
            people[socket.id] = {name:name, avatar:avatar};
        }
        io.sockets.emit("online_people", people);
        io.sockets.emit("Joined", name, socket.id);
    });

    socket.on('chat.message', message => {
        io.emit('chat_message', message);
    });

    socket.on('user.typing', userId => {
       io.emit('Typing', userId);
    });

    socket.on('stop.typing', userId => {
        io.emit('StopTyping', userId);
    });

    socket.on('disconnect', () => {
        if(people[socket.id]) {
            const data = JSON.stringify({name:people[socket.id].name, socketId: socket.id});
            socket.broadcast.emit('Left', data);
            delete people[socket.id];
        }
    })//tell all that someone disconnected
});