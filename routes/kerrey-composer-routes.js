/*
============================================
; Title: Assignment 4.2 - Composer API
; File Name: kerrey-composer-routes.js
; Author: Professor Krasso
; Date: 10 April 2022
; Modified By: Seth Kerrey
; Description:
;   Building a composer App.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
===========================================
*/

// Require statements
const express = require("express");
const router = express.Router();
const Composer = require("../models/kerrey-composer"); 

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *  get:
 *      tags:
 *          - Composers
 *      description: API for returning a list of composers from MongoDB Atlas
 *      summary: Returns a list of composer documents
 *      responses:
 *          "200":
 *              description: Array of composer documents
 *          "500":
 *              description: Server Exception
 *          "501":
 *              description: MongoDB Exception  
 */
router.get("/composers", async(req, res) => {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    "message": `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
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
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *  get:
 *      tags:
 *          - Composers
 *      description: API for returning a single composer object from MongoDB
 *      summary: Returns a composer document
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The composerId requested by the user.
 *          schema:
 *              type: string
 *      responses:
 *          "200":
 *              description: Composer Documents
 *          "500":
 *              description: Server Exception
 *          "501":
 *              description: MongoDB Exception  
 */
// findComposerById try...catch block [Ref B].
router.get("/composers/:id", async(req, res) => {
    try {
        Composer.findOne({ _id: req.params.id }, function(err, composer) {
            if (err) {
                res.status(501).send("MongoDB Exception")
            } else {
                res.json(composer);
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Exception")
    }
});

/**
 * createComposer
 * @swagger
 * /api/composers:
 *  post:
 *      tags:
 *          - Composers
 *      description: API for adding new composer objects
 *      summary: Creates a new composer object
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - firstName
 *                          - lastName
 *                      properties:
 *                          firstName:
 *                              description: Composer first name
 *                              type: string
 *                          lastName:
 *                              description: Composer last name
 *                              type: string
 *      responses:
 *          "200":
 *              description: Composer Documents
 *          "500":
 *              description: Server Exception
 *          "501":
 *              description: MongoDB Exception  
 */
 router.post("/composers", async(req, res) => {
    try {
        let composer = new Composer ({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        Composer.create(composer, function (err, addComposer) {
            if (err) {
                res.status(501).send("MongoDB Exception")
            } else {
                res.json(addComposer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Exception")
    }
})

module.exports = router;