/*
============================================
; Title: Assignment 9.2 - Capstone
; File Name: kerrey-team-routes.js
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
const express = require("express");
const router = express.Router();
const Team = require("../models/kerrey-team"); 

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *  get:
 *    tags:
 *      - Teams
 *    summary: Find all teams
 *    responses:
 *      "200":
 *        description: Array of team documents
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

/* findAllTeams */
router.get("/teams", async(req, res) => {
  try {
    Team.find({}, function(err, teams) {
      if (err) {
        console.log(err);
        res.status(501).send({
          "message": `MongoDB Exception: ${err}`
        })
      } else {
        console.log(teams);
        res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *  post:
 *    tags:
 *      - Teams
 *    summary: Assign players to team
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Team id
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
 *              - salary
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              salary:
 *                type: number
 *    responses:
 *      "200":
 *        description: Player documents
 *      "401":
 *        description: Invalid teamId
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

/* assignPlayertoTeam */
router.post("/teams/:id/players", async(req, res) => {
  try {
    Team.findOne({ "_id": req.params.id }, function(err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          "message": `MongoDB Exception ${err}`
        })
      } else {
        console.log(team);
        res.status(200).send({
          "message": "Player added to team"
        })

        const newPlayer = {
          firstName: req.body.firstName, 
          lastName: req.body.lastName, 
          salary: req.body.salary, 
        }

        team.players.push(newPlayer);
        team.save();
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *  get:
 *    tags:
 *      - Teams
 *    summary: Find all players by team id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Team id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Array of player documents
 *      "401":
 *        description: Invalid teamId
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

/* findAllPlayersByTeamId */
router.get("/teams/:id/players", async(req, res) => {
  try {
    Team.findOne({ "_id": req.params.id }, function(err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          "message": `MongoDB Exception ${err}`
        })
      } else {
        if (team) {
          console.log(team.players);
          res.status(200).json(team.players)
        } else {
          if (!team) {
            res.status(401).send({
              "message": "Invalid teamId"
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
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *  delete:
 *    tags:
 *      - Teams
 *    summary: Delete team by id
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Team id
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Team document
 *      "401":
 *        description: Invalid teamId
 *      "500":
 *        description: Server Exception
 *      "501":
 *        description: MongoDB Exception
 */

/* deleteTeamById */
router.delete("/teams/:id", async(req, res) => {
  try {
    Team.findByIdAndDelete({ _id: req.params.id }, function(err, team) {
      if (err) {
        console.log(err);
        res.status(501).send({
          "message": `MongoDB Exception ${err}`
        })
      } else {
        if (team) {
          console.log(team);
          res.status(200).json(team)
        } else {
          if (!team) {
            res.status(401).send({
              "message": "Invalid teamId"
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

 module.exports = router;