52.41
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const express=require("express")
const { default: mongoose } = require("mongoose")
const app=express()
const userRouter=require("./routes/user")
const port=process.env.PORT || 459
app.use(cors())
mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>{
    console.log("connected to db");
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/user",userRouter)






app.get("/",(req,res)=>{
    res.send("hello")
})




app.listen(port,()=>{
    console.log(`server is runngin : http://localhost:${port}`);
    
 })