const express = require('express');
// const bodyParser = require('body-parser'); express has a built in middleware 
const ejs = require('ejs');
const rootRoute = require('./routes/rootRoute.route');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use('/', rootRoute)





app.listen(3000, function(){
    console.log("Server listening on port 3000");
})