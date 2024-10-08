const Listing = require("../model/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}

module.exports.renderNewRoute = (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.showRoute = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate('owner');
    if (!listing) {
        req.flash("error", "listing does not exixt")
        res.redirect("/listings")
    }

    res.render('listings/show.ejs', { listing });
}

module.exports.createRoute = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id
    newListing.image = { url, filename }
    await newListing.save();
    req.flash("success", "New Listing Created")
    res.redirect('/listings');
}

module.exports.EditeRoute = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing does not exixt")
        res.redirect("/listings")
    }
    let orignalImage = listing.image.url;
    orignalImage = orignalImage.replace("/upload", "/upload/w_250")
    res.render('listings/edit.ejs', { listing, orignalImage });
}

module.exports.updateRoute = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save()
    }


    req.flash("success", "Listing was updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyRoute = async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect('/listings');
};
