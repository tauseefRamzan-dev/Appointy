require('dotenv').config();
const express = require("express");
const router = express.Router();
const doctorModel = require("../models/doctorModel");
const UsersModel=require("../models/auth");
const appointmentModel=require("../models/appointmentModel")
const doctors=require("../models/doctorModel")
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();
const cloudinaryConfig=require("../config/cloudinary")
const {verifyUser}=require("../middleware/auth")
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "appointy/doctors/images" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};


router.post("/add-doctor",verifyUser,upload.single("avatar"), async (req, res) => {

    {
        
        if(req.user.role==="admin")
        try {
            const {
                name,
                email,
                password,
                speciality,
                degree,
                experience,aboutDoctor, fee,address1, address2, date
        } = req.body;
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: "Doctor already exists with this email." });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Avatar image is required." });
        }
        let imageUrl = "";
        try {
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
            imageUrl = cloudinaryResult.secure_url;
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError);
            return res.status(500).json({ success: false, message: "Error uploading image to Cloudinary." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const fullAddress = address2 ? `${address1}, ${address2}` : address1;
        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            image: imageUrl, 
            speciality,
            degree,
            experience,
            about: aboutDoctor,      
            fees: Number(fee),        
            address: fullAddress,    
            date: date || Date.now()
        });

        await newDoctor.save();
        const doctorResponse = newDoctor.toObject();
        delete doctorResponse.password;
        res.status(201).json({ success: true, message: "Doctor added successfully", doctor: doctorResponse, isError: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
    else{
        res.status(401).json({success:false, message: "Unauthorized access", isError: true})
    }
    }
});

router.get("/dashboard",verifyUser,async(req,res)=>{
        try{
            if(req.user.role==="admin")
            {
                const doctors=await doctorModel.countDocuments({});
                const appointments=await appointmentModel.find({});
                const patients=await UsersModel.countDocuments({});


                const dashData = {
      doctors,
      appointments: appointments.length,
      patients,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ dashData,isError: false });
            }else{
               res.status(401).json({message: "Unauthorized Access", isError: true})
            }
        }catch(error){
             console.log(error);
             res.status(500).json({message: "Internal Server Error",isError: true})
        }
})
module.exports=router;