var mongoose = require('mongoose');

var resultSchema = mongoose.Schema({
    mac: { type: String , unique: true},
    time: {type: Date }
});
var Result = mongoose.model('result', resultSchema); 

module.exports = Result;
