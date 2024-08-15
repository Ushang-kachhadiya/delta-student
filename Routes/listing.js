const exprees = require('express')
const route = exprees.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLogged, isOwner, validateListing } = require('../middelware.js');
const listingController = require('../controllers/listings.js');
const multer = require('multer')
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage })

//Index Route
route.get('/', wrapAsync(listingController.index));

//New Route
route.get('/new', isLogged, listingController.renderNewRoute);

//Show Route
route.get('/:id', wrapAsync(listingController.showRoute));

//create Route
route.post('/',
    isLogged,
    upload.single('listing[image]'),
    validateListing,
    (listingController.createRoute));

//Edit route
route.get('/:id/edit', isLogged, isOwner, wrapAsync(listingController.EditeRoute));

//Update Route
route.put('/:id',
    isLogged,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateRoute));


//Delete Route
route.delete('/:id', isLogged, isOwner, wrapAsync, async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect('/listings');
});

//serch Route

module.exports = route;