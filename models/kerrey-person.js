/*
============================================
; Title: Assignment 5.2 - Person's API
; File Name: kerrey-person.js
; Author: Professor Krasso
; Date: 17 April 2022
; Modified By: Seth Kerrey
; Description:
;   Building a person API.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
;   https://mongoosejs.com/docs/schematypes.html
===========================================
*/

// Require statements
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

// Create schema
let roleSchema = new Schema({
    text: { type: String, required: true },
});
let dependentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
let personSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String, required: true}
});

// Export module
module.exports = mongoose.model("Person", personSchema);
