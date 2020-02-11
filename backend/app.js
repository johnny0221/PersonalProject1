const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PeopleRoutes = require("./routes/people");
const ProductRoutes = require("./routes/product");
const UtilRoutes = require("./routes/util");
const IngredientRoutes = require("./routes/ingredient");
const UserRoutes = require("./routes/user");
const CommentRoutes = require("./routes/comment");
const CartRoutes = require("./routes/cart");
const ActivityRoutes = require("./routes/activity");


mongoose.connect("mongodb+srv://johnny:Aa00850221@cluster0-yzadz.mongodb.net/OMO?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => {
        console.log('connection failed');
    })

mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use((req, res, next) => {
    //which domain is allowed to fetch the data.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, user"
    );
    //which http verbs are allow to send requests.
    //"Options" is a http verb that will be sent by the browser before POST, so we need to allow it too.
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
})

app.use("/people", PeopleRoutes);

app.use("/product", ProductRoutes);

app.use("/ingredient", IngredientRoutes);

app.use("/user", UserRoutes);

app.use("/comment", CommentRoutes);

app.use("/cart", CartRoutes);

app.use("/activity", ActivityRoutes);

app.use("", UtilRoutes);

module.exports = app;