// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

// if DB connection succeed
db.once('open', function () {
    console.log('DB connected');
});

// if DB connection failed
db.on('error', function (err) {
    console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB schema 
var studentSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    number: { type: Number },
    major: { type: String },
    email: { type: String },
    mac: { type: String },
});
var Student = mongoose.model('student', studentSchema); 

// Home 
app.get('/', function (req, res) {
    res.redirect('/students');
});

// Students - Index 
app.get('/students', function (req, res) {
    Student.find({}, function (err, students) {
        if (err) return res.json(err);
        res.render('students/index', { students: students });
    });
});

// Students - New // 8
app.get('/students/new', function (req, res) {
    res.render('students/new');
});

// Contacts - create // 9
app.post('/students', function (req, res) {
    Student.create(req.body, function (err, student) {
        if (err) return res.json(err);
        res.redirect('/students');
    });
});

// Port setting
var port = 3000;
app.listen(port, function () {
    console.log('server on! http://localhost:' + port);
});
