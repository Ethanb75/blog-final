var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require('passport'),
    methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User        = require('./models/user'),
    seedDB      = require("./seeds");
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//link our stysheet
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//Passport config
app.use(require("express-session")({
    secret: "Charles is adorable",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//user.auth comes from passportlocalmongoose in the user.js file
passport.use(new LocalStrategy(User.authenticate()));
//also from passport locat mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//end config

//middleware to add pass user data to every page so it's available in the header always
app.use(function(req,res,next){
    // adds variables available on all templates
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    //without the next it'll exit the current function
    next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});