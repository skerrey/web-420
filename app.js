/*
============================================
; Title: Assignment 1.2 - GitHub and Project Web 420
; File Name: app.js
; Author: Professor Krasso
; Date: 3 March 2022
; Modified By: Seth Kerrey
; Description:
;   Assignment to build a node app.
; Resources:
;   Code was provided by Prof Krasso, Bellevue University, and buwebdev repo
===========================================
*/

// Require statements ---------------------------------------------------------
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose"); 
const composerAPI = require("./routes/kerrey-composer-routes");
const personAPI = require("./routes/kerrey-person-routes");
const userAPI = require("./routes/kerrey-session-routes"); 
const customerAPI = require("./routes/kerrey-node-shopper-routes");
const teamAPI = require("./routes/kerrey-team-routes");

let app = express(); // Placeholder for Express app 

app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({"extended": true}));

// MongoDB database information
var mongoDB = "mongodb+srv://admin:MongoDBPassword132@buwebdev-cluster-1.ixkw5.mongodb.net/web420DB?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connected error:"));
db.once("open", function () {
    console.log("Application connected to MongoDB instance");
});

// Obj literals 
const options = { 
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTFul APIs",
            version: "1.0.0",
        }
    },
    apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specificiation
}

const openapiSpecification = swaggerJsdoc(options); // call swaggerJsdoc library - options

// Wire variable to app variable
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification)); 
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);
app.use('/api', teamAPI);

// Create Server

http:http.createServer(app).listen(app.get("port"), function() {console.log("Application started on port " + app.get("port"))});