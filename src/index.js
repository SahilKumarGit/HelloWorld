const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//connect mongo db
mongoose.connect("mongodb+srv://firstDB:zwPu7dwJG0RCXU9f@cluster0.kgij2.mongodb.net/sahil99?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then((data) => {
    console.log('mongoDB: 🎉 Good To Go...');
}, (err) => {
    console.error('mongoDB: 😒 Something went wron...');
    console.error(err);
});


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});