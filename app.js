const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))

const campgrounds = [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1517807289433-f0282e362596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=707&q=80"},
    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"},
    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"},
]

app.get("/", function(req, res){
    res.render("landing")
})

app.get("/campgrounds", function(req, res){

    res.render("campGrounds.ejs", {campgrounds:campgrounds})
})

app.post("/campgrounds", function(req, res){
    const name = req.body.name
    const image = req.body.image
    const newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    // redirect back to campground page (default of redirect is get req)
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
    res.render("new")
})

app.listen("3000", "0.0.0.0", function(){
    console.log("Server has started")
})
