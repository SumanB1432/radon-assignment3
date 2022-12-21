const cardModel=require("../Modules/cardModel")
let cardNumberRegex=/^[0-9]+$/


let isValid = (data) => {
    if (typeof data == "string" && data.trim().length == 0) return false;
    if (typeof data == null || typeof data == undefined) return false;
    return true;
  };
const createCard=async function(req,res){
    let {cardNumber,cardType,customerName,status,vision,customerId}=data
    if(!Object.keys(data).length){
        return res.status(400).send({status:false,message:"please give some data for cardcreation"})
    }
    if(!cardNumberRegex.test(cardNumber)){
       return res.status(400).send({status:false,message:"cardnumber is invalid formet"})
    }
    if(!isValid(cardNumber)){
        return res.status(400).send({status:false,message:"cardnumber is invalid"})
    }
    if(!isValid(cardType)){
        return res.status(400).send({status:false,message:"cardnumber is invalid"})
    }
    
}