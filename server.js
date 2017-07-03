const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes'),
    port = process.env.PORT || 8000;

const cors = require('cors'),
      history = require('connect-history-api-fallback');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Blogdb');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({origin: 'http://localhost:8080'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(__dirname + '/public'));

// parse application/json
app.use(bodyParser.json({limit:'10Mb'}));

//controllers
const PostController = require('./api/controllers/posts');
const CommentController = require('./api/controllers/comments');

PostController(app);

routes(app);


app.get('/api', (req, res, next) => {
    res.send('API is running');
});
/*app.use(history({
    index: 'public/dist/index.html'
}));*/
app.listen(port, () => console.log(`API server started on: http://localhost:${port}/api`));
