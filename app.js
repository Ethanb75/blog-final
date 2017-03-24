var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require('passport'),
    methodOverride = require("method-override"),
    LocalStrategy  = require("passport-local"),
    Post           = require("./models/post"),
    Comment        = require("./models/comment"),
    User           = require('./models/user');
    
var commentRoutes = require("./routes/comments"),
    postRoutes = require("./routes/posts"),
    searchRoutes = require("./routes/search"),
    indexRoutes = require("./routes/index");
    

//dev db is local, production db is an mlab server
var url = process.env.DATABASEURL || "mongodb://Ethan:fuck@ds121190.mlab.com:21190/ethans_blog";
mongoose.connect(url, function(err){
    if (err) throw err; 
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//link our stysheet
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

//Passport config
app.use(require("express-session")({
    secret: "King Charles",
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
app.use("/search", searchRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);

app.listen(3000, function(){
   console.log("Server is good");
});