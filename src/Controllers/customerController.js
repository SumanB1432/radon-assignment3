const customerModel = require("../Modules/customerModel");

let isValid = (data) => {
  if (typeof data == "string" && data.trim().length == 0) return false;
  if (typeof data == null || typeof data == undefined) return false;
  return true;
};
let nameRegex = /^[a-zA-Z]+$/;
let mobileRegex = /^[7-9][0-9]{9}$/;
let dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
let emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
let statusArr = ["ACTIVE", "INACTIVE"];

/////////////////////////////------------------------CREATE CUSTOMER-------------------//////////////////////////////////////

const createCustomer = async function (req, res) {
  try {
    let data = req.body;
    let {
      firstName,
      lastName,
      mobileNumber,
      DOB,
      emailId,
      address,
      customerId,
      status,
    } = data;

    /*******************************VALIDATIONS ***********************************************/
    if (!Object.keys(data).length) {
      return res.status(400).send({
        status: false,
        message: "please provide some data to create customer",
      });
    }
    if (!isValid(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide First Name" });
    }
    if (!nameRegex.test(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: " first name only contain alphabate" });
    }

    if (!isValid(lastName)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide Last Name" });
    }
    if (!nameRegex.test(lastName)) {
      return res
        .status(400)
        .send({ status: false, message: "last name only contain alphabate" });
    }

    if (!isValid(mobileNumber)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide mobile number" });
    }
    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).send({
        status: false,
        message: "please provide valid indian mobile number",
      });
    }
    let findMobile = await customerModel.findOne({
      mobileNumber: mobileNumber,
      status: "ACTIVE",
    });
    if (findMobile) {
      return res.status(400).send({
        status: false,
        message: `${mobileNumber} is already registered`,
      });
    }
    if (!isValid(DOB)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide DOB" });
    }
    if (!dateRegex.test(DOB)) {
      return res.status(400).send({
        status: false,
        message: "please provide DOB in MM/DD/YYYY formate",
      });
    }
    if (!isValid(emailId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide email" });
    }
    if (!emailRegex.test(emailId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide a valid email id" });
    }
    let findEmail = await customerModel.findOne({
      emailId: emailId,
      status: "ACTIVE",
    });
    if (findEmail) {
      return res
        .status(400)
        .send({ status: false, message: `${emailId} is already registered` });
    }

    if (!isValid(address)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide address" });
    }

    if (!isValid(customerId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide email" });
    }
    let findId = await customerModel.findOne({
      customerId: customerId,
      status: "ACTIVE",
    });
    if (findId) {
      return res
        .status(400)
        .send({ status: false, message: `${customerId} already registered` });
    }

    if (status) {
      let newStatus = status.trim().toUpperCase();

      if (statusArr.indexOf(newStatus) == -1) {
        return res
          .status(400)
          .send({ status: false, message: `status should be in ${statusArr}` });
      }
    }

    /***********************************CREATE DATA IN DATA BASE ***********************************************/
    const createData = await customerModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "Successfull", data: createData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/////////////////////////-----------------------GET CUSTOMER--------------------------//////////////////////////////////////
const getCustomerDetail = async function (req, res) {
  try {
    const detail = await customerModel.find({ status: "ACTIVE" });
    return res.status(200).send({ status: true, data: detail });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
//////////////////////////////////-------------DELETE CUSTOMER------------------------///////////////////////////////////

const deleteCustomer = async function (req, res) {
  try {
    const customerid = req.params.customerId;
    const data = await customerModel.findOneAndUpdate(
      { customerId: customerid, status: "ACTIVE" },
      { status: "INACTIVE" },
      { new: true }
    );
    if (!data) {
      return res.status(404).send({ status: false, message: "data not found" });
    }
    return res.status(200).send({ status: "true", data: data });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createCustomer, getCustomerDetail, deleteCustomer };
