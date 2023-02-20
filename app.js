const express = require('express');
const ejs = require('ejs');
const rootRoute = require('./routes/rootRoute.route');
const {PORT} = require('./config')

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use('/', rootRoute)





app.listen(PORT, function(){
    console.log(`Server listening on port http://127.0.0.1:${PORT}`);
})