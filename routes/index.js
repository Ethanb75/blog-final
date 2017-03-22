var express     = require("express"),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/user');
router.get("/", function(req, res){
    res.redirect("/posts");
});
//Authentication Routes
//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register",function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //an error example would be registering a user with the same username
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("/register");
        } else {
            //uses the local strategy to authenticate instead of twitter, facebook etc
            //this is technically logging the person in after they make a new account
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome " + user.username);
               res.redirect("/posts"); 
            });
        }
    })
});

//show login form 
router.get("/login", function(req, res) {
   res.render("login");
});

//login route, handling logic
//passport authenticate is the middleware we set up above
//difference between register: We are doing a check first, and then giving access to a logged in page
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/posts",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logic route 
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Successfully logged out.")
    res.redirect("/posts")
});


module.exports = router;