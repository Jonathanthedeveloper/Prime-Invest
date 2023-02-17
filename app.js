const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render("index");
})
app.get('/aboutUS', (req, res) => {
    res.render("aboutUS");
})
app.get('/services', (req, res) => {
    res.render("services");
})
app.get('/faq', (req, res) => {
    res.render("faq");
})
app.get('/contact', (req, res) => {
    res.render("contact");
})
app.get('/login', (req, res) => {
    res.render("login");
})
app.get('/create', (req, res) => {
    res.render("create");
})
app.get('/policies', (req, res) => {
    res.render("policies");
})
app.get('/forgot', (req, res) => {
    res.render("forgotPassword");
})



app.listen(3000, function(){
    console.log("Server listening on port 3000");
})