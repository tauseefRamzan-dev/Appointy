// const express=require("express");
// const router=express.Router();
// const Users=require("../models/auth");
// const multer = require("multer");

// router.post("/update-profil/:id",upload.single("avatar"),(req,res)=>{
//     const _id=req.params.id;
//     const {phone,address,gender,dob,avatar}=req.body


//     const updateUser=Users.findOneAndUpdate({_id},{merge: true},{phone,address,gender,dob,avatar})

// })


const express = require("express");
const router = express.Router();
const Users = require("../models/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {verifyUser}=require("../middleware/auth")

const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "appointy/users/images" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

router.post("/update-profile/:id", verifyUser,upload.single("avatar"), async (req, res) => {
    try {
        const _id = req.params.id;
        const { phone, gender, dob } = req.body;
        let parsedAddress = req.body.address;
        if (typeof parsedAddress === 'string') {
            try {
                parsedAddress = JSON.parse(parsedAddress);
            } catch (e) {
                parsedAddress = { line1: '', line2: '' };
            }
        }
        const updateData = {
            phone,
            gender,
            dob,
            ...(parsedAddress && { address: parsedAddress })
        };

        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
            updateData.photo = {
                url: cloudinaryResponse.secure_url,
                publicId: cloudinaryResponse.public_id
            };
        }
        const updatedUser = await Users.findOneAndUpdate(
            { _id }, 
            { $set: updateData }, 
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Profile updated successfully!", 
            user: updatedUser 
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;