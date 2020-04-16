// index.js

var express = require('express');
var mongoose = require('mongoose');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);     
mongoose.set('useUnifiedTopology', true); 
mongoose.connect(process.env.MONGO_DB); 
var db = mongoose.connection;

// if DB connection succeed
db.once('open', function(){
  console.log('DB connected');
});

// if DB connection failed
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});