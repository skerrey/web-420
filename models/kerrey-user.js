/*
============================================
; Title: Assignment 6.2 - User's API
; File Name: kerrey-user.js
; Author: Professor Krasso
; Date: 24 April 2022
; Modified By: Seth Kerrey
; Description:
;   Building a user API.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
===========================================
*/

// Require statements
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

// Create schema
let userSchema = new Schema({
    userName: { type: String, required: true },
    Password: { type: String, required: true },
    emailAddress: { type: Array, required: true }
});


// Export module
module.exports = mongoose.model("User", userSchema);
