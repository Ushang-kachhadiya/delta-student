const exprees = require('express')
const route = exprees.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirect } = require('../middelware.js');
const userController = require('../controllers/users.js');
const router = exprees.Router

route.get("/signup", userController.signup)

route.post("/signup", wrapAsync(userController.renderSignup))

route.get("/login", userController.login)

route.post("/login", saveRedirect,
    passport.authenticate("local",
        {
            failureRedirect: '/login',
            failureFlash: true
        }),
    userController.renderLogin
)

//LogOut Route
route.get("/logout", userController.logOut)


module.exports = route;