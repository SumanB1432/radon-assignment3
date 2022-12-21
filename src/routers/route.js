const express = require("express");
let router = express.Router();
let customerController = require("../Controllers/customerController");

router.post('/createCustomer',customerController.createCustomer)
router.get("/getCustomer",customerController.getCustomerDetail)
router.delete("/deleteCustomer/:customerId",customerController.deleteCustomer)


module.exports = router;

