var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

var mongoose = require('mongoose');
var Activity = require('../models/activity');

mongoose.connect('mongodb://newOrder:haloRemix@ds019986.mlab.com:19986/tuttifrutti');


router.get('/', function(req, res) {
  res.send('Yes I am ready'); 
  
});



router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// Get All activities
router.get('/activities', function(req, res){
    Activity.find(function(err, activities){
        if(err){
            res.send(err);
        }
        res.json(activities);
    });
});

// Get Single activity
router.get('/activity/:activity_id', function(req, res, next){
 Activity.findById(req.params.activity_id, function(err, activity) {
    if (err)
      res.send(err);

    res.json(activity);
  });
});

//Save Activity
router.post('/activity', function(req, res, next){
    var activity = new Activity();

  // Set the properties that came from the POST data
  activity.name = req.body.name;
  activity.venue = req.body.venue;
  activity.date = req.body.date;
  activity.time = req.body.time;
  activity.isPrivate = req.body.isPrivate;
  activity.price = req.body.price;
  activity.category = req.body.category;
  // Save and check for errors
  activity.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Stuff added to the locker!', data: activity });
  });
});

// Delete Activity
router.delete('/Activity/:id', function(req, res, next){
ctivity.findByIdAndRemove(req.params.activity_id, function(err, activity){
    if(err)
      res.send(err);
    //delete the activity 
      res.json({message: 'activity removed!'});
  });
});

// Update Activity
router.put('/Activity/:id', function(req, res, next){
    Activity.findById(req.params.activity_id, function(err, activity){
    if (err)
      res.send(err);
    //update activity time 
    if (req.body.name)
      activity.name = req.body.name;
    if(req.body.venue)
      activity.venue = req.body.venue;
    if (req.body.date)
      activity.date = req.body.date;
     if(req.body.time)
      activity.time = req.body.time;
     if(req.body.category)
      activity.category = req.body.category;
    if(req.body.isPrivate)
    activity.isPrivate = req.body.isPrivate;
    

    //save update
    activity.save(function(err){
      if(err)
        res.send(err);
      res.json(activity);
    });
  });
});


module.exports = router;