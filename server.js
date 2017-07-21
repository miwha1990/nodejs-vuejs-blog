const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    routes = require('./api/routes'),
    port = process.env.PORT || 8000;

const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Blogdb');

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors({origin: 'http://localhost:8080'}));
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
app.use('/', express.static(__dirname + '/public'));
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

app.get('/api', (req, res, next) => {
    console.log(io.sockets.adapter);
    res.send('API is running');
});
const server = app.listen(port, () => console.log(`API server started on: http://localhost:${port}/api`));
const io = require('socket.io')(server);
app.get('/onlineUsers', (req,res,next) => {res.send(people)});
const people = {};
io.on('connection', (socket) => {

    // io.emit('Joined', socket.id); //tell all that someone connected


    socket.on("join", function(name){
        console.log('1st name', name);
        if(!people[socket.id]){
            people[socket.id] = name;
        }
        io.emit('Onlines', people);
        socket.emit("update", "You have connected to the server.");
        console.log('people', people);
        io.sockets.emit("update_people", people);
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
        const data = JSON.stringify({name:people[socket.id], socketId: socket.id});
        socket.broadcast.emit('Left', data);
        delete people[socket.id];
    })//tell all that someone disconnected
});