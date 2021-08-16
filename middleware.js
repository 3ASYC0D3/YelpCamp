const Campground = require('./models/campground');
const ExpressError = require('./utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    req.session.returnTo = req.originalUrl;
    if (!req.isAuthenticated()){
        req.flash('error', 'You must be signed in first.');
        return res.redirect('/login');
    };
    next();
};

module.exports.validateCampground = (req, res, next) => {
    const result = campgroundSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.message, 400);
    } else {
        next();
}};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit.');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
};

// Reviews middleware below 

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        throw new ExpressError(result.error.message, 400);
    } else {
        next();
}};