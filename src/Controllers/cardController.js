const cardModel = require("../Modules/cardModel");
const customerModel = require("../Modules/customerModel");

let cardNumberRegex = /^[0-9]+$/;
let statusArr = ["ACTIVE", "INACTIVE"];

let isValid = (data) => {
  if (typeof data == "string" && data.trim().length == 0) return false;
  if (typeof data == null || typeof data == undefined) return false;
  return true;
};
///////////////////////////////------------------CREATE CARD------------------------------////////////////////////////////
const createCard = async function (req, res) {
  try {
    let data = req.body;
    let { cardNumber, cardType, status, vision, customerId } = data;
    /*******************************VALIDATIONS ***********************************************/
    if (!Object.keys(data).length) {
      return res.status(400).send({
        status: false,
        message: "please give some data for card creation",
      });
    }
    if (!cardNumberRegex.test(cardNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "card number is invalid format" });
    }
    if (!isValid(cardNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "card number is invalid" });
    }

    let findCard = await cardModel.findOne({
      cardNumber: cardNumber,
      status: "ACTIVE",
    });
    if (findCard) {
      return res
        .status(400)
        .send({ status: false, message: `${cardNumber} is already exist` });
    }
    if (!isValid(cardType)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide card type" });
    }

    let findCustomer = await customerModel.findOne({ customerId: customerId });
    if (!findCustomer) {
      return res
        .status(404)
        .send({ status: false, message: "CustomerID Is not valid " });
    }

    let fullName = findCustomer.firstName + " " + findCustomer.lastName;

    if (status) {
      let newStatus = status.trim().toUpperCase();

      if (statusArr.indexOf(newStatus) == -1) {
        return res
          .status(400)
          .send({ status: false, message: `status should be in ${statusArr}` });
      }
    }

    if (vision) {
      if (!isValid(vision)) {
        return res
          .status(400)
          .send({ status: false, message: "please provide a vision" });
      }
    }

    let totalData = {
      cardNumber: cardNumber,
      cardType: cardType,
      customerName: fullName,
      status: status,
      vision: vision,
      customerId: customerId,
    };
    /***********************************CREATE DATA IN DATA BASE ***********************************************/

    const createCard = await cardModel.create(totalData);
    return res
      .status(201)
      .send({ status: true, message: "successful", data: createCard });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
//////////////////////////////////--------------GET CARD -----------------------////////////////////////////////////

const getCard = async function (req, res) {
  try {
    let allCard = await cardModel.find({ status: "ACTIVE" });
    return res
      .status(200)
      .send({ status: true, message: "successful", data: allCard });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = { createCard, getCard };
