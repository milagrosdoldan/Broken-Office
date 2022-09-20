const express = require("express");
const router = express.Router();
const User = require("./user");
const Admin = require("./admin");
const Report = require("./reports");

/**
 * @swagger
 * /api/report/catchreport/{id}:
 *  put:
 *    summary: updated fullname
 *    tag: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      201:
 *        description: Report 
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */


/**
 * @swagger
 * /api/report/modifyreport/{id}:
 *  put:
 *    summary: updated state fullfilled
 *    tag: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      200:
 *        description: Report solved!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/solvereport/{id}:
 *  put:
 *    summary: updated state fullfilled
 *    tag: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            state: 'fullfilled'
 *    responses:
 *      201:
 *        description: Report solved!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/rejectedreport/{id}:
 *  put:
 *    summary: updated state rejected
 *    tag: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            state: 'rejected'
 *    responses:
 *      201:
 *        description: Report rejected!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/removereport/{id}:
 *  delete:
 *    summary: report deleted
 *    tag: [Reports]
 *    parameters:
 *      - in: path
 *        _id: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reports'
 *    responses:
 *      200:
 *        description: report deleted 
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /api/report/deleteall:
 *  delete:
 *    summary: delete all reports 
 *    tag: [Reports] * 
 *    responses:
 *      201:
 *        description: Deleted all!
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */



router.use("/user", User);
router.use("/admin", Admin);
router.use("/report", Report);

module.exports = router;
