var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const jwt = require('express-jwt');
var cors = require('cors');


var activities = require('./routes/activities');


var port = process.env.PORT || 3000;

var app = express();
app.use(cors());

const authCheck =jwt({
 secret: new Buffer('by27muMa4KanRODi_XPA05egyA2VQnfI9FVpi157dS-MzXK9V9wLPAVGJBH-giCr', 'base64'),
 audience: 'pwDyOusCeQTYNKMtHMgjVy8y89TQtASm'
});

//View Engine
app.set('views', path.join(__dirname,'src/views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);


//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/api',activities);



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}
app.listen(port,function(){
    console.log('Server started on port ' + port);
});
