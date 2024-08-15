const exprees = require('express')
const route = exprees.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const { validateReview, isLogged, isReviewAuthor } = require('../middelware.js');
const reviewController = require('../controllers/reviews.js');



route.post('/', isLogged, validateReview, wrapAsync(reviewController.createReview));

route.delete('/:reviewId', isLogged, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = route;