const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth, checkForAuthentication, restrectTo } = require("./middlewares/auth");

// env file load
require('dotenv').config();

// import db config file
const db = require('./db');

// Define a Port
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)
// define route 


app.use("/user", userRoute);
// app.use("/", checkAuth, staticRoute);
// app.use("/url", restrictToLoggedinUserOnly, urlRoute);

app.use("/url", restrectTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/", staticRoute);
// app.use("/url", urlRoute);

app.listen(PORT, ()=>{console.log(`Listening on port : ${PORT}`)})