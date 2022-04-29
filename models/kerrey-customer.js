/*
============================================
; Title: Assignment 7.2 - NodeShopper API
; File Name: kerrey-customer.js
; Author: Professor Krasso
; Date: 1 May 2022
; Modified By: Seth Kerrey
; Description:
;   Building a NodeShopper API.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
===========================================
*/

// Require statements
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

// Create schema
let lineItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

let invoiceSchema = new Schema({
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    dateCreated: { type: String, required: true },
    dateShipped: { type: String, required: true },
    lineItems: [lineItemSchema]
});

let customerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    invoices: [invoiceSchema]
});

// Export module
module.exports = mongoose.model("Customer", customerSchema);
