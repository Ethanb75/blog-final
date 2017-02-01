var Campground= require("../models/campground");
var Comment = require("../models/comment");

//all middleware
var middlewareObj = {
    
    checkCampOwnership: function (req,res,next){
        //is the user logged in? (authenticated)
        if (req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error","Campground not found");
                    res.redirect("back");
                } else {
                    //does the user own the campground?
                    //need to use .equals method that comes with mongoose because one is an object and the other is a string lol
                    if (foundCampground.author.id.equals(req.user._id)) {
                        next();
                        
                    } else {
                        req.flash("error","You don't have permission to do that.");
                        res.redirect("back")
                    }
                }
            });
        } else {
            req.flash("error","You need to be logged in to do that.");
            // takes the user to the previous page
            res.redirect("back");
        }
    },
    
    checkCommentOwnership: function(req,res,next){
        //is the user logged in? (authenticated)
        if (req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    
                    res.redirect("back");
                } else {
                    //does the user own the comment?
                    //need to use .equals method that comes with mongoose because one is an object and the other is a string lol
                    if (foundComment.author.id.equals(req.user._id)) {
                        next();
                        
                    } else {
                        req.flash("error","You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error","You need to be logged in to do that.");
            // takes the user to the previous page
            res.redirect("back");
        }
    },
    
    isLoggedIn: function(req,res,next){
        //if the user is authenticated next method which calls the next bit of code or the next function etc
        if (req.isAuthenticated()){
            return next();
        }
        //if user isn't auth, flash message then redirect to login page
        req.flash("error", "Please Login First.");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;