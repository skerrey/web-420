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

let app = express(); // Placeholder for Express app

app.set("port", process.env.PORT || 3000); 

app.use(express.json()); 
app.use(express.urlencoded({"extended": true}));

const options = { // Obj literal 
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTFul APIs",
            version: "1.0.0",
        }
    },
    apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specificiation
};

const openapiSpecification = swaggerJsdoc(options); // call swaggerJsdoc library - options

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification)); // wire variable to app variable

// Create Server
http.createServer(app).listen(app.get("port"), function() {
     console.log("Application started and listening on port " + app.get("port") + ".")
});