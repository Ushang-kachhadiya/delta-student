const Listing = require("../model/listing");
const review = require("../model/review");

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created")
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async (req, res) => {
    try {

        const { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "review deleted")
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.log(err)
    }
}