var express = require("express");
//router is an express package
//merges the campground and comments parameters together
var router = express.Router({mergeParams: true});
var Campground= require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

router.post("/", middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error","Something went wrong.")
               console.log(err);
           } else {
               //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
               //save the comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash("success","Successfully added comment.");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});


//editing comment posts
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
  });
});

//UPDATE Comment ROUTE (place to submit the editted form)
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    //custom mongoose method to find and update
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if (err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
  });
});

//DESTROY Comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("back");
        } else {
            req.flash("success","Comment deleted.")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});


module.exports = router;