//add all the routers to the router variable and export it at the end
var express = require("express");
var router = express.Router();
var Post   = require("../models/post");
var middleware = require("../middleware");

//SEED DB
// Post.create({
//     name: "A Great Blog Post"
// })

//INDEX - show all Posts
router.get("/", function(req, res){
    // Get all Posts from DB
    Post.find({}, function(err, allPosts){
       if(err){
           console.log(err);
       } else {
          res.render("posts/index",{posts: allPosts});
       }
    });
});

//CREATE - add new post to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to posts array
    let date = new Date();
    let strDate = date.getTime();
    let name = req.body.name;
    let image = req.body.image;
    let body = req.body.body;
    let tagArr = [];
    req.body.forEach((el)=>{console.log(el)});
    let author = {
      id: req.user._id,
      username: req.user.username
    };
    let newPost = {name: name, image: image, body: body, author: author, date: strDate, tags: tagArr};
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/posts");
        }
    });
});

//NEW - show form to create new post
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("posts/new"); 
});

// SHOW - shows more info about one post
router.get("/:id", function(req, res){
    //find the post with provided ID
    var data = Post.findById(req.params.id).populate("comments");
    data.exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            //render show template with that post
            res.render("posts/show", {post: foundPost});
        }
    });
});

//All 3 routes below need to be authorized (once authenticated, what can this user do?)
// EDIT POST ROUTE
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
       res.render("posts/edit",{post: foundPost}); 
    });
});
//UPDATE POST ROUTE (place to submit the editted form)
router.put("/:id", middleware.checkPostOwnership, function(req,res){
   Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
      if (err){
          res.redirect("/posts");
      } else {
          res.redirect("/posts/" + req.params.id);
      }
   });
});

//DESTROY POST route (damn son)

router.delete("/:id", middleware.checkPostOwnership, function(req,res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    })
});



module.exports = router;