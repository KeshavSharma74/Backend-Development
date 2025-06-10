require("dotenv").config();
const mongoose=require("mongoose");

const connectWithDatabase=()=>{
        mongoose.connect(process.env.DATABASE_URL)
        .then( ()=> console.log("Database Connected Successfully..!!!") )
        .catch( (error)=>{
            console.log("Database Connection failed..!!!");
            console.log(error);
            process.exit(1);
        })
}

module.exports={connectWithDatabase};