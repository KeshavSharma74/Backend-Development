const express=require("express")

const app=express();

const bodyParser=require("body-parser")

app.use(bodyParser.json())

const PORT=3000;

app.listen(PORT,()=>{
    console.log("App is listening at port : " + PORT);
})

app.get('/',(req,res)=>{
    res.send("I am already on home page")
})

app.post('/api/cars',(req,res)=>{
    const {name,brand}=req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Successfully...!!");
})

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/myDatabase",{
    useNewurlParser:true,
    useUnifiedTopology:true
})
.then( ()=>{
    console.log("Connection Successful..!!");
} )
.catch( (error)=>{
    console.log("Recived an error while connecting database..!!")
} )