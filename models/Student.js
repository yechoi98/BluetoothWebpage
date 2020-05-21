var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: { type: String },
    number: { type: Number },
    major: { type: String },
    email: { type: String },
    mac: { type: String , unique: true},
});
var Student = mongoose.model('student', studentSchema); 

module.exports = Student;