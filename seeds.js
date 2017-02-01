var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Bacon ipsum dolor amet drumstick jerky swine, picanha cupim ground round chicken pork. Strip steak jowl venison pancetta cupim, chicken short ribs pork belly. Chicken ball tip spare ribs ham chuck shank fatback meatball turducken pork belly salami shankle flank shoulder capicola. Filet mignon meatball andouille drumstick fatback, beef ribs venison t-bone pork loin tail chicken bacon ham hock. Short ribs pork belly tongue turducken, spare ribs shank porchetta ribeye meatloaf meatball brisket. T-bone chuck landjaeger sausage venison. T-bone chuck picanha, drumstick pig prosciutto cupim."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Bacon ipsum dolor amet drumstick jerky swine, picanha cupim ground round chicken pork. Strip steak jowl venison pancetta cupim, chicken short ribs pork belly. Chicken ball tip spare ribs ham chuck shank fatback meatball turducken pork belly salami shankle flank shoulder capicola. Filet mignon meatball andouille drumstick fatback, beef ribs venison t-bone pork loin tail chicken bacon ham hock. Short ribs pork belly tongue turducken, spare ribs shank porchetta ribeye meatloaf meatball brisket. T-bone chuck landjaeger sausage venison. T-bone chuck picanha, drumstick pig prosciutto cupim."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Bacon ipsum dolor amet drumstick jerky swine, picanha cupim ground round chicken pork. Strip steak jowl venison pancetta cupim, chicken short ribs pork belly. Chicken ball tip spare ribs ham chuck shank fatback meatball turducken pork belly salami shankle flank shoulder capicola. Filet mignon meatball andouille drumstick fatback, beef ribs venison t-bone pork loin tail chicken bacon ham hock. Short ribs pork belly tongue turducken, spare ribs shank porchetta ribeye meatloaf meatball brisket. T-bone chuck landjaeger sausage venison. T-bone chuck picanha, drumstick pig prosciutto cupim."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
