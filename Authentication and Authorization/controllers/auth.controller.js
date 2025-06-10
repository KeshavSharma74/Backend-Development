const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

const signup = async(req,res) =>{
    try{

        const {username,email,password,role}=req.body;

        if(!username || !email || !password || !role){
            return res.status(400).json({
                status:false,
                message:"username, email, password and role should be present..!!!"
            })
        }

        const userPresent = await User.findOne({username});
        if(userPresent){
            return res.status(400).json({
                status:false,
                message:"username already present..!!!"
            })
        }

        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                status:false,
                message:"password cannot be encrypted..!!"
            })
        }

        const newUser=new User({
            username,email,password:hashedPassword,role
        })

        
        const user= await newUser.save();

        res.status(200).json({
            status:true,
            data:user,
            message:"User registered Successfully..!!!"
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
                status:false,
                message:"User registration failed..!!!"
        })
    }
}

module.exports = {signup}
