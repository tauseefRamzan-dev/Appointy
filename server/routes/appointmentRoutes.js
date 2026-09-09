// const express=require("express");
// const router=express.Router();
// const { verifyUser } = require("../middleware/auth");
// const doctorModel=require("../models/doctorModel")
// const Users=require("../models/auth")
// const appointmentModel=require("../models/appointmentModel")
// router.post("/book_appointment",verifyUser,async(req,res)=>{
//     try{
        
//         const userId=req.user.uid;
//         const {docId,slotDate,slotTime}=req.body;

//         const docData = await doctorModel.findById(docId).select("-password").lean();
//         if (!docData) {
//             return res.status(404).json({ message: 'Doctor Not Found', isError: true });
//         }
//         if (!docData.available) {
//                 return res.json({message: 'Doctor Not Available',isError:true })
//             }
//             let slots_booked = docData.slots_booked

//             if (slots_booked[slotDate]) {
//                 if (slots_booked[slotDate].includes(slotTime)) {
//                     return res.json({ message: 'Slot Not Available',isError:true })
//                 }
//                 else {
//                     slots_booked[slotDate].push(slotTime)
//                 }
//             } else {
//                 slots_booked[slotDate] = []
//                 slots_booked[slotDate].push(slotTime)
//             }

//             const userData=await Users.findOne({uid: userId}).select("-password");

//             delete docData.slots_booked;
            
//             const appointmentData = {
//                 userId,
//                 docId,
//                 userData,
//                 docData,
//                 amount: docData.fees,
//                 slotTime,
//                 slotDate,
//                 date: Date.now()
//             }


//             const newAppointment = new appointmentModel(appointmentData)
//                     await newAppointment.save()

//                     await doctorModel.findByIdAndUpdate(docId, { slots_booked })
            
//                     res.status(201).json({ message: 'Appointment Booked',isError: false })
//         }catch(error){
//  console.log(error)
//         res.status(500).json({ message: "Internal Server Error",isError:true })
//         }




// })
// module.exports=router;


const express = require("express");
const router = express.Router();
const { verifyUser } = require("../middleware/auth");
const doctorModel = require("../models/doctorModel");
const Users = require("../models/auth");
const appointmentModel = require("../models/appointmentModel");

router.post("/book_appointment", verifyUser, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { docId, slotDate, slotTime } = req.body;

        // Added .lean() here so slots_booked can be checked and modified safely
        const docData = await doctorModel.findById(docId).select("-password").lean();
        
        if (!docData) {
            return res.status(404).json({ message: 'Doctor Not Found', isError: true });
        }
        
        if (!docData.available) {
            return res.json({ message: 'Doctor Not Available', isError: true });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ message: 'Slot Not Available', isError: true });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await Users.findOne({ uid: userId }).select("-password").lean();

        if (!userData) {
            return res.status(404).json({ message: 'User Not Found', isError: true });
        }

        delete docData.slots_booked;
        
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        
        res.status(201).json({ message: 'Appointment Booked', isError: false });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", isError: true });
    }
});


router.get("/getAppointments",async(req,res)=>{
    try
    {
        if(true)
        {
              const appointments=await appointmentModel.find({}).sort({ date: -1 });
              res.status(200).json({message: "All appointments fetched",isError:false,appointments})
        }
        else{
            res.status(401).json({message:"Unauthorized access",isError:true})
        }
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error",isError:true})
    }
})

router.get("/getAppointmentsByDoctor/:id",verifyUser,async(req,res)=>{
    try
    {
        if(req.user.role==="doctor")
        {
            const docId=req.params.id;
              const appointments=await appointmentModel.find({docId}).sort({ date: -1 });
              res.status(200).json({message: "Appointments fetched",isError:false,appointments})
        }
        else{
            res.status(401).json({message:"Unauthorized access",isError:true})
        }
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error",isError:true})
    }
})



router.get("/getAppointmentsByPatient/:id",async(req,res)=>{
    try
    {
        if(true)
        {
            const userId=req.params.id;
              const appointments=await appointmentModel.find({userId}).sort({ date: -1 });
              res.status(200).json({message: "Appointments fetched",isError:false,appointments})
        }
        else{
            res.status(401).json({message:"Unauthorized access",isError:true})
        }
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Internal Server Error",isError:true})
    }
})

router.patch("/appointment_complete/:id",verifyUser,async(req,res)=>{
try{
    const _id=req.params.id;
    const updatedAppointment=await appointmentModel.findByIdAndUpdate({_id},{isCompleted: true},{new: true} )
    if (!updatedAppointment){
        return res.status(404).json({ message: "Appointment not found",isError: true });
    }


const { docId, slotDate, slotTime } = updatedAppointment

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ message: "Appointment completed successfully",isError:false, updatedAppointment });
}catch (error) {
    res.status(500).json({ message: "Internal Server Error",isError:true });
  }
            
})


router.patch("/appointment_cancel/:id",verifyUser,async(req,res)=>{
try{
    const _id=req.params.id;
    const updatedAppointment=await appointmentModel.findByIdAndUpdate({_id},{cancelled: true},{new: true} )
    if (!updatedAppointment){
        return res.status(404).json({ message: "Appointment not found",isError: true });
    }


const { docId, slotDate, slotTime } = updatedAppointment

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.json({ message: "Appointment cancelled successfully",isError:false, updatedAppointment });
}catch (error) {
    res.status(500).json({ message: "Internal Server Error",isError:true });
  }
            
})




            
module.exports = router;