var express = require("express");
var router = express.Router();
var Post   = require("../models/post");
var middleware = require("../middleware");

router.get('/', function(req,res){
    res.render('search/index');
});
router.get("/:id", function(req, res){

});
router.post('/', function(req,res){
    let searchText = req.body.searchText;
    Post.find({}, function(err, allPosts){
        res.redirect("/:id", {posts: allPosts});
    });   
});

module.exports = router;