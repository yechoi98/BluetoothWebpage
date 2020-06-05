var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Result = require('../models/Result');
var f = require('../public/js/functions')


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

// Students - Graph
router.get('/graph', function(req, res){
    Result.find({}, function(err, results) {
        if (err) res.json(err)
        Student.find({}, function(err, students) {
            if (err) res.json(err)
            res.render('students/graph', { o: f.getCountsO(results, students), x: f.getCountsX(results, students)});
        })
    })
})

// Students - New
router.get('/new', function (req, res) {
    res.render('students/new');
});

// Students - create
router.post('/', function (req, res) {
    Student.create(req.body, function (err, student) {
        if (err) return res.json(err);
    });
    Result.create({ mac: req.body.mac }, function (err, result) {
        if (err) return res.json(err);
    });
    res.redirect('/students');
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
    });
    Result.findOneAndUpdate({mac : req.params.mac}, {mac : req.body.mac}, function (err, result) {
      if(err) return res.json(err);
    })
    res.redirect('/students');
});

// Students - destroy
router.delete('/:mac', function (req, res) {
    Student.deleteOne({ number: req.params.mac }, function (err) {
        if (err) return res.json(err);
    });

    Result.deleteOne({mac : req.params.mac}, function (err) {
      if(err) return res.json(err);
    })
    res.redirect('/students');
});


module.exports = router;


