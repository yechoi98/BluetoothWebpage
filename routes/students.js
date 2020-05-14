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

  // Students - Graph 
router.get('/graph', function (req, res) {
  Student.find({}, function (err, students) {
      if (err) return res.json(err)
      Scan.find({}, function (err, scans) {
        if (err) return res.json(err)
        var counts_O = 0
        var counts_X = 0
        for(var s in students) {
          for(var i in scans){
            // UTC로 저장된 몽고디비 시간을 한국 시간대(-9시간)로 변경
            var scanTimeInMilliSec = new Date(scans[i].time).getTime()-32400000 
    
            // 스캔된 데이터의 맥주소와 유저의 맥주소가 서로 일치하고 스캔된 데이터의 시간이 현재 시간에서 3분 안의 데이터이면 "O"를 return    
            if(scans[i].address == students[s].mac && scanTimeInMilliSec > new Date().getTime() - 300000){
                counts_O++
                break
            } 
          }
        }
        
      counts_X = students.length - counts_O
      res.render('students/graph', { counts_O: counts_O, counts_X: counts_X});
      })
  });
});

  module.exports = router;
