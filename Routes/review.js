const express =  require ("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require ("../utils/wrapAsync.js")
const ExpressError = require ("../utils/ExpressError.js")
const Review = require ("../MODELS/review.js");
const Listing = require ("../MODELS/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require ("../middleware.js")




// Review
// Post Review Route
const reviewcontroller  = require ("../controllers/reviews.js")

router.post ("/", isLoggedIn, validateReview, wrapAsync(reviewcontroller.createReview));


// Delete Review Route 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, 
   wrapAsync (reviewcontroller.destroyReview ));
   

module.exports = router;