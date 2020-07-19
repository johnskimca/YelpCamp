const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Mountain Goat's Rest",
//           image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80",
//           description: "This is a huge granite hill, no bathrooms. No water."
//     }, function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("Newly created campground")
//             console.log(campground);
//         }
//     }
// )
// const campgrounds = [
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"},
//     {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"},
//     {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80"},
//     {name: "Granite Hill", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"},
//     {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"},
// ];

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("index.ejs", {campgrounds:allCampgrounds});
       }
    });
});

// Create - add new campground to database
app.post("/campgrounds", function(req, res){
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground)
    // redirect back to campground page (default of redirect is get req)
});

// New - show form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with the provided ID
    // render show template with that id
    Campground.findById(req.params.id, function(err, foundCampGround){
        if(err){
            console.log(err)
        } else {
            res.render("show", {campground: foundCampGround})
        }
    });
});

app.listen("3000", "0.0.0.0", function(){
    console.log("Server has started");
});
