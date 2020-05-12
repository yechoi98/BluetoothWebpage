var express = require('express');
var router = express.Router();
var Student = require('../models/Student'); 
var Scan = require('../models/Scan'); 

// Students - Index 
router.get('/', function (req, res) {
    Student.find({}, function (err, students) {
        if (err) return res.json(err);
        Scan.find({}, function (err, scans) {
          if (err) return res.json(err);
          res.render('students/index', { students: students, scans: scans});
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
});

// Students - edit 
router.get('/:id/edit', function(req, res){
    Student.findOne({_id:req.params.id}, function(err, student){
      if(err) return res.json(err);
      res.render('students/edit', {student:student});
    });
});

// Students - update 
router.put('/:id', function(req, res){
    Student.findOneAndUpdate({_id:req.params.id}, req.body, function(err, student){
      if(err) return res.json(err);
      res.redirect('/students');
    });
});

  // Students - destroy
  router.delete('/:id', function(req, res){
    Student.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/students');
    });
  });

  module.exports = router;
