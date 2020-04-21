var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    number: { type: Number },
    major: { type: String },
    email: { type: String },
    mac: { type: String },
});
var Student = mongoose.model('student', studentSchema); 

module.exports = Student;