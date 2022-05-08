/*
============================================
; Title: Assignment 4.2 / 8.2 - Composer API
; File Name: kerrey-composer-routes.js
; Author: Professor Krasso
; Date: 10 April 2022 / 8 May 2022
; Modified By: Seth Kerrey
; Description:
;   Building a composer App.
; Resources:
;   buwebdev, Professor Krasso, Bellevue University
;   MongoDB save()
;     https://www.mongodb.com/docs/v4.0/reference/method/db.collection.save/
;   geeksforgeeks findByIdAndDelete()
;     https://www.geeksforgeeks.org/mongoose-findbyidanddelete-function/
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
 router.post("/composers/", async(req, res) => {
    try {
        let composer = new Composer ({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        Composer.create(composer, function (err, addComposer) {
            if (err) {
                res.status(501).send("MongoDB Exception")
            } else {
                console.log(addComposer);
                res.json(addComposer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send("Server Exception")
    }
})


/**
 * updateComposerByID
 * @openapi
 * /api/composers/{id}:
 *  put:
 *    tags:
 *      - Composers
 *    summary: Update composer by ID
 *    parameters: 
 *      - name: id
 *        in: path
 *        required: true
 *        description: Composer ID
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            required:
 *              - firstName
 *              - lastName
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *    responses:
 *      "200":
 *        description: Array of composer documents
 *      "401":
 *        description: Invalid composerId
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

 router.put("/composers/:id", async(req, res) => {
  try {
      Composer.findOne({ _id: req.params.id }, function(err, composer) {
          if (err) {
            console.log(err);
            res.status(501).send({
              "message": `MongoDB Exception ${err}`
            })
          } else {
            if (composer) {
              composer.set({
                firstName: req.body.firstName,
                lastName: req.body.lastName
              })
              composer.save(function(err, savedComposer) {
                if(err) {
                  console.log(err);
                  req.status(501).send({
                    "message": `MongoDB Exception ${err}`
                  })
                } else {
                  console.log(savedComposer);
                  res.status(200).json(composer)
                }
              })
            } else {
              if (!composer) {
                res.status(401).send({
                  "message": "Invalid composerId"
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
});

/**
 * deleteComposerById
 * @openapi
 * /api/composers/{id}:
 *  delete:
 *    tags:
 *      - Composers
 *    summary: Delete composer by Id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Composer id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Composer document
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

router.delete("/composers/:id", async(req, res) => {
  try {
    Composer.findByIdAndDelete({ _id: req.params.id }, function(err, composer) {
        if (err) {
          console.log(err);
          res.status(501).send({
            "message": `MongoDB Exception ${err}`
          })
        } else {
          console.log(composer);
          res.status(200).json(composer)
        }
    });
} catch (e) {
    console.log(e);
    res.status(500).send({
      "message": `Server Exception: ${e}`
    })
  }
});


module.exports = router;