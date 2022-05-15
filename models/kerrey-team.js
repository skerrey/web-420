/*
============================================
; Title: Assignment 9.2 - Capstone
; File Name: kerrey-team.js
; Author: Professor Krasso
; Date: 15 May 2022
; Modified By: Seth Kerrey
; Description:
;   Capstone project to test knowledge from WEB 420
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
===========================================
*/

// Require statements
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

// Create schema
let playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true }
});

let teamSchema = new Schema({
  name: { type: String, required: true },
  mascot: { type: String, required: true },
  players: [playerSchema]
});

// Export module
module.exports = mongoose.model("Team", teamSchema);