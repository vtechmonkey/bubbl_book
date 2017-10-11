  var express = require('express');
  var router = express.Router();
  var bodyparser = require('body-parser');
  var multer =  require('multer');
  var mongoose = require('mongoose');
  var Activity = require('../models/activity');

  mongoose.connect('mongodb://newOrder:haloRemix@ds019986.mlab.com:19986/tuttifrutti')
  //mongoose.connect('mongodb://bubbles:bubbles!12@ds123331.mlab.com:23331/bubblbook')
  .then(() =>console.log('connected to database'))
  .catch((err)=> console.error(err));

  router.get('/', function(req, res) {
    res.send('Yes I am ready'); 
    
  });



  router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
  });

  // Get All activities
  router.get('/activities', function(req, res,next){
      Activity.find(function(err, activities){
          if(err){
              res.send(err);
          }
          res.json(activities);
      });
  });

  // Get Single activity
  router.get('/activities/:_id', function(req, res,next){
  Activity.findById(req.params._id, function(err, activity) {
      if (err)
        res.send(err);

      res.json(activity);
    });
  });

  //Save Activity
  router.post('/activities', function(req, res, next){
      var activity = new Activity();

    // Set the properties that came from the POST data
    activity.authUserId = req.body.authUserId;
    activity.name = req.body.name;
    activity.description = req.body.description;
    activity.fullDescription = req.body.fullDescription;
    activity.activityLocation = req.body.activityLocation;
    activity.duration = req.body.duration;
    activity.imageURL = req.body.imageURL;
    activity.min = req.body.min;
    activity.max = req.body.max;
    activity.providerUrl = req.body.providerUrl;
    activity.category = req.body.category;
    activity.subCategory = req.body.subCategory;
    activity.comments = req.body.comments;
    activity.prices = req.body.prices;
    activity.dates = req.body.dates;


    // Save and check for errors
    activity.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'activity added', data: activity });
    });
  });

  // Delete Activity
  router.delete('/activities/:_id', function(req, res){
  Activity.findByIdAndRemove(req.params._id, function(err, activity){
      if(err)
        res.send(err);
      //delete the activity 
        res.json({message: 'activity removed!'});
    });
  });

  // Update Activity
  router.put('/activities/:_id', function(req, res,next){
      Activity.findById(req.params._id, function(err, activity){
      if (err)
        res.send(err);
      //update activity time 
      if (req.body.name)  //only edits name if name is changed   
        activity.name = req.body.name;
      if(req.body.description)
        activity.description = req.body.description;
        if(req.body.fullDescription)
        activity.fullDescription = req.body.fullDescription;
      if (req.body.activityLocation)
        activity.activityLocation = req.body.activityLocation;
      if(req.body.duration)
        activity.duration = req.body.duration;
      if(req.body.imageURL)
        activity.imageURL = req.body.imageURL;
      if(req.body.min)
        activity.min = req.body.min;
      if(req.body.max)
        activity.max = req.body.max;
      if(req.body.providerUrl)
        activity.providerUrl = req.body.providerUrl;
      if(req.body.category)
        activity.category = req.body.category;
      if(req.body.subCategory)
        activity.subCategory = req.body.subCategory;
      if(req.body.comments)
        activity.comments = req.body.comments;
      if(req.body.prices)
        activity.prices = req.body.prices;
      if(req.body.dates)
        activity.dates = req.body.dates;
      if (req.body.dateOptions)
        activity.dateOptions = req.body.dateOptions;
      
      //save update
      activity.save(function(err){ 
        if(err)
          res.send(err);
        res.json(activity);
      });
    });
  });


  module.exports = router;