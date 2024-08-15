const User = require("../model/user.js");

module.exports.signup = (req, res) => {
    res.render("listings/users/signUp.ejs")
}

module.exports.renderSignup = async (req, res) => {
    try {

        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser)
        //Auto login
        req.login(registerUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", "Welcom to wanderlust")
            res.redirect("/listings")
        })
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}

module.exports.login = (req, res) => {
    res.render("listings/users/login.ejs")
}

module.exports.renderLogin = async (req, res) => {
    req.flash('success', "Welcome back");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "you are logout!")
        res.redirect("/listings")
    })
}