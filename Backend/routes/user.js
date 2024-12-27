const express=require("express");
const { handleRegistation,handleSignIn } = require("../controllers/user");


const router=express.Router();




router.post("/register",handleRegistation)
router.post("/signin",handleSignIn)



module.exports=router