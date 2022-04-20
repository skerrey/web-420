/*
============================================
; Title: Assignment 6.2 - User's API
; File Name: kerrey-session-user.js
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
const express = require("express");
const router = express.Router();
const User = require("../models/kerrey-user"); 
const bcrypt = require("bcryptjs");

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Registered user
 *       "401":
 *         description: Username already in use
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.post("/signup", async(req, res) => {
	try {
		const hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
		const newRegisteredUser = {
			userName: req.body.userName,
			Password: hashedPassword,
			emailAddress: req.body.emailAddress
		};
		
		User.findOne({"userName": req.body.userName}, function(err, user){
			if (err) {
				res.status(501).send({
					"message": `MongoDB Exception ${err}`
				})
			} else {
				if (!user) {
					User.create(newRegisteredUser, function (err, user) {
						if (err) {
							res.status(501).send({
								"message": `MongoDB Exception ${err}`
							})
						} else {
							res.status(200).send({
								"message": "Registered User"
							})
							res.json(user);
						}
					})	
				} else {
					if (user) {
						res.status(401).send({
							"message": "Username is already in use"
						})
					}
				}
			}
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			"message": `Server Exception: ${e}`
	})
	}
})


/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     description: API for logging in user
 *     summary: User login
 *     requestBody:
 *       required: trie
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       "200":
 *         description: User logged in
 *       "401":
 *         description: Invalid username amd/or password
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */
router.post("/login", async(req, res) => {
	try {
		User.findOne({"userName": req.body.userName}, function(err,user){
			if (err) {
				res.status(501).send({
					"message": `MongoDB Exception ${err}`
				})
			} else {
				if (user) {
					let passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);

					if (passwordIsValid) {
						res.status(200).send({
							"message": "User logged in"
						})
					} else {
						res.status(401).send({
							"message": "Invalid username and/or password"
						})
					}
				} else {
					if (!user) {
						res.status(401).send({
							"message": "Invalid username and/or password"
						})
					}
				}
			}	
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			"message": `Server Exception: ${e}`
		})
	}
})

module.exports = router;