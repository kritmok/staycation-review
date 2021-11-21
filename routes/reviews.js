const express = require("express");
const router = express.Router({mergeParams: true});
const reviews = require('../controller/reviews');
const Hotel = require("../models/hotel");
const Review = require("../models/review");


//setup Reviews route 
router.post('/', reviews.createReview);
  
  //setup Review delete route 
  router.delete('/:reviewId', reviews.destroyReview);

  module.exports = router;