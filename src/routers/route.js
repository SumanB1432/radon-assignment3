const express = require("express");
let router = express.Router();
let customerController = require("../Controllers/customerController");
const cardController = require("../Controllers/cardController")

router.post('/createCustomer',customerController.createCustomer) //CREATE CUSTOMER REQUEST
router.get("/getCustomer",customerController.getCustomerDetail) //GET CUSTOMER DETAILS REQUEST
router.delete("/deleteCustomer/:customerId",customerController.deleteCustomer) //DELETE CUSTOMER REQUEST

router.post("/createCard",cardController.createCard)//CREATE CARD REQUEST
router.get("/getCard",cardController.getCard)//FET CARD REQUEST


module.exports = router;

