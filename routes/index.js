var express     = require("express"),
    router      = express.Router(),
    passport    = require('passport'),
TwitterStrategy = require('passport-twitter').Strategy,
    User        = require('../models/user');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});




//twitter authentication
// passport.use(new TwitterStrategy({
//     consumerKey: process.env.TWITTER_CONSUMER_KEY,
//     consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       process.nextTick(function() {

//             User.findOne({ 'twitter.id' : profile.id }, function(err, user) {


//                 // if there is an error, stop everything and return that
//                 // ie an error connecting to the database
//                 if (err)
//                     return done(err);

//                 // if the user is found then log them in
//                 if (user) {
//                     return done(null, user); // user found, return that user
//                 } else {
//                     // if there is no user, create them
//                     var newUser                 = new User();

//                     // set all of the user data that we need
//                      CHANGE BELOW
//                     newUser.twitter.id          = profile.id;
//                     newUser.twitter.token       = token;
//                     newUser.twitter.username    = profile.username;
//                     newUser.twitter.displayName = profile.displayName;

//                     // save our user into the database
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//                         return done(null, newUser);
//                     });
//                 }

//             });
//       });
//   }
// ));
// router.post("/login/twitter", passport.authenticate("twitter", { failureRedirect:"/login" }))



router.get("/", function(req, res){
    res.redirect("/posts");
});
//Authentication Routes
//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//new routes for about page
router.get('/about', function(req,res){
    res.render('about');
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
router.post("/login/local", passport.authenticate("local", 
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