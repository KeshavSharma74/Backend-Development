const express=require("express");
const app=express();
require("dotenv").config();
const {connectWithDatabase} = require("./database/index.js")
app.use(express.json());
const router=require("./routes/user.route.js");

const port=process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log("Server is listening at port " + port);
})

connectWithDatabase();

app.use("/api/v1",router);
