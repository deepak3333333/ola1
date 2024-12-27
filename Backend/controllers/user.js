const User = require("../models/user");
const { createTokenForUser } = require("../services/authenticatin");

async function handleRegistation(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const registationdata = await User.create({
    firstname,
    lastname,
    email,
    password,
  });
  if (!registationdata) {
    res.status(400).json({ message: "user not created" });
  }
  const token=createTokenForUser(registationdata)
  return res.cookie("token",token).redirect("/")
}


async function handleSignIn(req,res){
    const {email,password}=req.body
    try{
        const token=await User.matchedPasswordAndGenrateToken(email,password)
        return res.cookie("token",token).redirect("/")
    }
    catch(err){
        return res.status(400).json({message:err.message})
    } 
    
}

module.exports={handleRegistation,handleSignIn}