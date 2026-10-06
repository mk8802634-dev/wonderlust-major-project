const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../MODELS/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require ("../controllers/users.js")


router.route("/signup")
    .get(userController.renderSignupFrom)
    .post(wrapAsync(userController.signup))


router.route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);


// LOGOUT
router.get("/logout", userController.logout);

module.exports = router;