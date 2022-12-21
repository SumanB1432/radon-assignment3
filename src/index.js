const express = require("express");
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const route = require("./routers/route")


app.use(bodyparser.json());






mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://Suman-1432:Suman1432@cluster0.bkkfmpr.mongodb.net/assignment-3").then(()=>{
    console.log("mongo db is connected")
}).catch((err)=>{
    console.log(err)
})

app.use("/", route)



let port = 3000;
app.listen(3000,(err)=>{
   if(!err){
    console.log(`Connected in port no ${port}`)
   }
   else{
    console.log(err)
   }
})



