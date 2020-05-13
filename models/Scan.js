var mongoose = require('mongoose');

var scanSchema = mongoose.Schema({
    address: { type: String, required: true, unique: true },
    deviceName: { type: String },
    time: { type: Date },
});
var Scan = mongoose.model('scan', scanSchema); 

module.exports = Scan;


