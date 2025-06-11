const File=require("../models/file.models.js");

const localFileUpload = (req,res) =>{
    try{
        const file=req.files.file;
        console.log("file : ",file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(path);

        file.mv(path, (error)=>{
            console.log(error)
        } );

        res.json({
            success:true,
            message:"Local File uploaded Successfully..!!!"
        })

    }
    catch(error){
        res.json({
            success:false,
            message:"failed uploading file..!!!"
        })
    }
}

module.exports = {localFileUpload}