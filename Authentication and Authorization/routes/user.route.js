const express=require("express");
const router = express.Router();
const {signup} = require("../controllers/auth.controller.js");
const {login} = require("../controllers/auth.controller.js");
const {auth}=require("../middlewares/auth.middleware.js")

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/test').get(auth, (req,res)=>{
    res.status(200).json({
        status:true,
        message:"welcome to test page..!!!"
    })
} )

module.exports = router;