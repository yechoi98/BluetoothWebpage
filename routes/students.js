var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Scan = require('../models/Scan');
var Result = require('../models/Result');

// Students - Index
router.get('/', function (req, res) {
    
    Student.find({}, function (err, students) {
        if (err) return res.json(err);
       
        Result.find({}, function (err, results) {
            if (err) return res.json(err)
            res.render('students/index', {students: students, results: results})
        })
    });
});

// Students - New
router.get('/new', function (req, res) {
    res.render('students/new');
});

// Students - create
router.post('/', function (req, res) {
    Student.create(req.body, function (err, student) {
        if (err) return res.json(err);
        res.redirect('/students');
    });
    Result.create({ mac: req.body.mac }, function (err, result) {
        if (err) return res.json(err);
    });
});

// Students - edit
router.get('/:id/edit', function (req, res) {
    Student.findOne({ _id: req.params.id }, function (err, student) {
        if (err) return res.json(err);
        res.render('students/edit', { student: student });
    });
});

// Students - update
router.put('/:mac', function (req, res) {
    Student.findOneAndUpdate({ mac: req.params.mac }, req.body, function (err, student) {
      console.log(req.params.mac)
        if (err) return res.json(err);
        res.redirect('/students');
    });
    Result.findOneAndUpdate({mac : req.params.mac}, {mac : req.body.mac}, function (err, result) {
      if(err) return res.json(err);
    })
});

// Students - destroy
router.delete('/:mac', function (req, res) {
    Student.deleteOne({ mac: req.params.mac }, function (err) {

      console.log(req.params.mac)
        if (err) return res.json(err);
        res.redirect('/students');
    });

    Result.deleteOne({mac : req.params.mac}, function (err) {
      if(err) return res.json(err);
    })
});


module.exports = router;


