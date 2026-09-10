const express=require("express");
const { verifyUser } = require("../middleware/auth");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const multer = require("multer");
const router=express.Router();
const upload=multer()


router.get("/getDoctors",async(req,res)=>{
    try {
    const doctors = await doctorModel.find({}).select("-password -email").sort({ date: -1 });
    res.json({ doctors,isError: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", isError:true });
  }
});
router.get("/single/:id",async(req,res)=>{
    try {
      const _id = req.params.id;
    const doctor = await doctorModel.find({_id}).select("-password -email");
    res.json({ doctor,isError: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", isError:true });
  }
});

router.post("/update-profile/:id",upload.none(),async(req,res)=>{
try {
        const _id = req.params.id;
        const { about,fees,address,available } = req.body;
        const updateData= 
        {
            about,
            fees,
           address,
           ...(available !== undefined && { available: available === 'true' || available === true })
        }

        const updatedDoctor=await doctorModel.findOneAndUpdate({_id}, updateData, { returnDocument: 'after' });

        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found",isError:true });
        }

        res.status(200).json({ 
            success: true, 
            message: "Profile updated successfully!", 
            user: updatedDoctor
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({message: "Internal Server Error",isError:true });
    }
})

router.post("/availbilityUpdate/:id",async(req,res)=>{

  try{

    const _id=req.params.id;
    
    const doctor = await doctorModel.findById(_id);
    
if (!doctor) {
  return res.status(404).json({ message: "Doctor not found", isError: true });
}

const updatedDoctor = await doctorModel.findByIdAndUpdate(
  _id,
  { available: !doctor.available },
  { new: true }
);

res.status(200).json({message: "Doctor availbility Sucessfully updated",IsError: false})
}catch(error){
  console.log(error)
    res.status(500).json({message: "Internal Server Error", isError: true})
}
})

router.get("/dashboard",verifyUser,async (req, res) => {
  try {
    if(req.user.role==="doctor")
    {

      const docId = req.user.id;
      const appointments = await appointmentModel.find({ docId });
      
      let earnings = 0;
    const patientSet = new Set();

    appointments.forEach((a) => {
      if (a.isCompleted || a.payment) earnings += a.amount;
      patientSet.add(a.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientSet.size,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    
    res.json({ dashData,isError: false });
  }else{
    res.status(401).json({message: "Unauthorized access", isError: true})
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", isError:true });
  }
})

module.exports=router