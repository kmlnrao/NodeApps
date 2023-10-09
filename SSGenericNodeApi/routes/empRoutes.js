const express = require("express");
const router = express.Router();
const filelog=require('../config/globals/globalfunction');
const responseChange = require("../config/sqlconnection/responsechange");
const global=require('../config/sqlconnection/mapper');
const dbSchema=require('../config/sqlconnection/scema')

router.post('/employee_get', (req, res) => {
    global(dbSchema.employee_get, req.body, req.cParams).then((response) => {
        res.json(responseChange(response, req.cParams));
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.post('/employee_insert', (req, res) => {
    global(dbSchema.employee_insert, req.body, req.cParams).then((response) => {
        res.json(responseChange(response, req.cParams));
    }).catch((error) => {
        res.status(400).send(error);
    });
});

router.post('/employee_update', (req, res) => {
    global(dbSchema.employee_update, req.body, req.cParams).then((response) => {
        res.json(responseChange(response, req.cParams));
    }).catch((error) => {
        res.status(400).send(error);
    });
});


router.post('/employee_delete', (req, res) => {
    global(dbSchema.employee_delete, req.body, req.cParams).then((response) => {
        res.json(responseChange(response, req.cParams));
    }).catch((error) => {
        res.status(400).send(error);
    });
});

module.exports = router;