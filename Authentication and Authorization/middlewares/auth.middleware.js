require("dotenv").config();
const jwt=require("jsonwebtoken");

const auth = (req,res,next) =>{
    try{
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                status:false,
                message:"Token Missing"
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decode)
            req.user=decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }

        next();
    }
    catch(error){

    }

}

const isStudent = (req,res,next) =>{
    try{
        if(req.user.role!=="Student"){
            res.status(200).json({
                success:false,
                message:"This is a protected route for students..!!!"
            })
        }
        next();
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:"User role is not matching"
        })
    }
}



module.exports={auth,isStudent}