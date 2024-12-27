const { default: mongoose } = require("mongoose");
const {createHmac,randomBytes}=require("crypto");
const { createTokenForUser } = require("../services/authenticatin");



const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt:{
        type:String
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save",function(next){
    const user=this
    const salt=randomBytes(32).toString('hex')
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt
    this.password=hashedPassword
    next()
})
userSchema.static("matchedPasswordAndGenrateToken",async function(email,password){
    const user=await this.findOne({email:email})
    if(!user) throw new Error("User not found")
    const salt=user.salt
    const hashedpassword=user.password
    const userProviedeHashed=createHmac("sha256",salt).update(password).digest("hex")
    if(hashedpassword!==userProviedeHashed) throw new Error("Password not matched")
    const token=createTokenForUser(user)
    return token
})






const User=mongoose.model('user',userSchema)
module.exports=User
