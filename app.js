const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const mongoose = require('mongoose')



const rootRoute = require('./routes/rootRoute.route');
const { PORT } = require('./config')

const app = express();



// configurations

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRoute);

// so that mongoose no go disturb my ear with deprecation warning
mongoose.set('strictQuery', true)


// connecting to mongoose

mongoose.connect(process.env.URI)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.error("Something went wrong while connecting to database: " + error))





app.listen(PORT, function () {
    console.log(`Server listening on port http://127.0.0.1:${PORT}`);
})


// var session = require('express-session');

