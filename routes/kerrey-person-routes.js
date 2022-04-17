/*
============================================
; Title: Assignment 5.2 - Person's API
; File Name: kerrey-person-routes.js
; Author: Professor Krasso
; Date: 17 April 2022
; Modified By: Seth Kerrey
; Description:
;   Building a person API.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
===========================================
*/

// Require statements
const express = require("express");
const router = express.Router();
const Person = require("../models/kerrey-person"); 

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *  get:
 *      tags:
 *          - Persons
 *      description: API for returning a list of persons from MongoDB Atlas
 *      summary: Returns a list of person documents
 *      responses:
 *          "200":
 *              description: Array of person documents
 *          "500":
 *              description: Server Exception
 *          "501":
 *              description: MongoDB Exception  
 */
router.get("/persons", async(req, res) => {
	try {
		Person.find({}, function(err, persons) {
			if (err) {
				console.log(err);
				res.status(501).send({
					"message": `MongoDB Exception: ${err}`
				})
			} else {
				console.log(persons);
				res.json(persons);
			}
		})
	} catch (e) {
		console.log(e);
		res.status(500).send({
			"message": `Server Exception: ${e.message}`
		})
	}
})

/**
 * createPerson
 * @openapi
 * /api/persons:
 *  post:
 *      tags:
 *          - Persons
 *      description: API for adding new person objects
 *      summary: Creates a new person object
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      required:
 *                          - firstName
 *                          - lastName
 *                          - roles
 *                          - dependents
 *                          - birthDate
 *                      properties:
 *                          firstName:
 *                              description: Person first name
 *                              type: string
 *                          lastName:
 *                              description: Person last name
 *                              type: string
 *                          roles:
 *                              description: Person role
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      text:
 *                                          type: string
 *                          dependents:
 *                              description: Person dependents
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      firstName:
 *                                          type: string
 *                                      lastName:
 *                                          type: string
 *                          birthDate:
 *                              description: Person birth date
 *                              type: string
 *      responses:
 *          "200":
 *              description: Array of person Documents
 *          "500":
 *              description: Server Exception
 *          "501":
 *              description: MongoDB Exception  
 */
 router.post("/persons", async(req, res) => {
	try {
		let person = new Person ({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			roles: req.body.roles,
			dependents: req.body.dependents,
			birthDate: req.body.birthDate
		});
		Person.create(person, function (err, addPerson) {
			if (err) {
				res.status(501).send("MongoDB Exception")
			} else {
				res.json(addPerson);
			}
		})
	} catch (e) {
		console.log(e);
		res.status(500).send("Server Exception")
	}
})

module.exports = router;