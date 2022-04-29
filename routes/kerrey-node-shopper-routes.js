/*
============================================
; Title: Assignment 7.2 - NodeShopper API
; File Name: kerrey-node-shopper-routes.js
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
const express = require("express");
const router = express.Router();
const Customer = require("../models/kerrey-customer"); 

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Customer added to MongoDB
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */

/* createCustomer */
 router.post("/customers", async(req, res) => {
	try {
		const newCustomer = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			userName: req.body.userName,
		};
		Customer.create(newCustomer, function (err, customer) {
			if (err) {
        console.log(err);
				res.status(501).send({
          "message": `MongoDB Exception ${err}`
        })
			} else {
        console.log(customer);
				res.status(200).send({
          "message": "Customer created"
        })
			}
		})
	} catch (e) {
		console.log(e);
		res.status(500).send({
			"message": `Server Exception: ${e}`
	  })
	}
})

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Create invoice by username
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer username
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       "200":
 *         description: Invoice added to MongoDB
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */

/* createInvoiceByUserName */
 router.post("/customers/:userName/invoices", async(req, res) => {
  try {
      Customer.findOne({ "userName": req.params.userName }, function(err, customer) {
          if (err) {
            console.log(err);
            res.status(501).send({
              "message": `MongoDB Exception ${err}`
            })
          } else {
            console.log(customer);
            res.status(200).send({
              "message": "Customer created by invoice"
            })

            const newInvoice = {
              userName: req.params.userName,
              subtotal: req.body.subtotal,
              tax: req.body.tax,
              dateCreated: req.body.dateCreated,
              dateShipped: req.body.dateShipped
            }

            customer.invoices.push(newInvoice);
            customer.save();
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
 * findAllInvoicesByUsername
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Find all invoices by username
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Customer username
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Invoice added to MongoDB
 *       "500":
 *         description: Server Exception
 *       "501":
 *         description: MongoDB Exception
 */

/* findAllInvoicesByUserName */
router.get("/customers/:userName/invoices", async(req, res) => {
  try {
      Customer.findOne({ userName: req.params.userName }, function(err, customer) {
          if (err) {
            console.log(err);
            res.status(501).send({
              "message": `MongoDB Exception ${err}`
            })
          } else {
            console.log(customer.invoices);
            res.json(customer.invoices)
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