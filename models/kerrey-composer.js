/*
============================================
; Title: Assignment 4.2 - Composer API
; File Name: kerrey-composer.js
; Author: Professor Krasso
; Date: 10 April 2022
; Modified By: Seth Kerrey
; Description:
;   Building a composer App.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
;   https://openclassrooms.com/en/courses/5614116-go-full-stack-with-node-js-express-and-mongodb/5656216-create-a-data-schema
===========================================
*/

// Require statements
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

// Create schema
let composerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

// Export module
module.exports = mongoose.model("Composer", composerSchema);
