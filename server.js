const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
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

app.use('/', express.static(__dirname + '/public'));

//controllers
const PostController = require('./api/controllers/posts');
const CommentController = require('./api/controllers/comments');

PostController(app);
routes(app);

app.get('/api', (req, res, next) => {
    res.send('API is running');
});
app.listen(port, () => console.log(`API server started on: http://localhost:${port}/api`));
