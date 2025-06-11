const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: false,
                message: "email and password are mandatory..!!!"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "user is not present..!!\nPlease signup first..!!"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log("Password match:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: false,
                message: "Incorrect Password..!!!"
            });
        }

        const payLoad = {
            email: user.email,
            role: user.role,
            id: user._id
        };

        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });

        const userData = user.toObject();
        userData.token = token;
        userData.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        return res.cookie("token", token, options).status(200).json({
            status: true,
            data: userData,
            message: "User Logged in Successfully..!!!"
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            status: false,
            message: "User cannot be logged in..!!!"
        });
    }
};

module.exports = {signup,login}
