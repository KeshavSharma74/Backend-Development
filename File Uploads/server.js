const express=require("express");
const app=express();
require("dotenv").config();
const fileUpload=require("express-fileupload");
const {connectWithDatabase} = require("./config/database.js");
const {cloudinaryConnect} = require("./config/cloudinary.js");
const upload = require("./routes/fileUpload.js")

app.use(express.json());
app.use(fileUpload())

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("Server is listening on port " + port);
})

app.use("/api/v1",upload)

connectWithDatabase();
cloudinaryConnect();