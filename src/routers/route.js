const express = require("express");
let router = express.Router();
let customerController = require("../Controllers/customerController");

router.post('/createCustomer',customerController.createCustomer)


module.exports = router;

