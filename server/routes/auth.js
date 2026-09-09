const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const {getRandomId,isValidEmail}=require("../utils/global")
const Users=require("../models/auth")
const doctorModel=require("../models/doctorModel")
const {verifyUser}=require("../middleware/auth")
const {JWT_SECRET_KEY}=process.env;
router.post("/register",async(req,res)=>{
  try{

    const {fullName, email,password}=req.body;
    
   if (fullName.length < 3) {
      return res
        .status(400)
        .json({ message: "Full name isn't correct", isError: true });
    }
    if (!isValidEmail(email)) {
      return res
        .status(403)
        .json({ message: "Email address isn't valid", isError: true });
    }
    if (password.length < 6) {
      return res
        .status(403)
        .json({ message: "Password must be minimum 6 chars.", isError: true });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered.", isError: true });
    }

const uid=getRandomId();
const hashedPassword=await bcrypt.hash(password,10);
const userData={uid,fullName, email,password: hashedPassword};
const user=new Users(userData);

await user.save();
res.status(201).json({message: "A new user has been sucessfully added."})
}catch(error){
console.error("error", error);
    res
      .status(500)
      .json({
        message: "User not registered. Internal Server Error.",
        error,
        isError: true,
      });
}

})

router.post("/login",async(req,res)=>{
  try{

    const {email,password}=req.body;
    
    if (!isValidEmail(email)) {
      return res
        .status(403)
        .json({ message: "Email address isn't valid", isError: true });
    }

const user=await Users.findOne({email})
if(!user){
  return res
        .status(400)
        .json({ message: "Invalid credentials", isError: true });
}
const match=await bcrypt.compare(password,user.password);
if(!match){
  return res
        .status(400)
        .json({ message: "Invalid credentials", isError: true });
}

const token=jwt.sign({uid: user.uid , role: user.role}, JWT_SECRET_KEY, {expiresIn: "1d"})

res.status(200).json({ message: "Login successful", token })
}catch(error){
console.error("error", error);
    res.status(500).json({
        message: "User not sign-in. Internal Server Error.",
        error,
        isError: true,
      });
}
})

router.get("/user",verifyUser,async(req,res)=>{

   try{
          const { uid } = req.user
          // console.log('uid', uid)
  
          const user = await Users.findOne({ uid }).select("-password")
          if (!user) { return res.status(404).json({ message: "User not found", isError: true }) }
  
          return res.status(200).json({ message: "User found", user })
  
      } catch (error) {
          console.error("error", error)
          res.status(500).json({ message: "User not found. Internal Server Error.", error, isError: true })
      }


})

router.post("/forget-password",async(req,res)=>{
  try{
  const {email}=req.body;
  const user=Users.findOne({email})

  if(!user)
  {
    res.status(404).json({message: "User not found", isError: true})
  }

  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });
    await Otp.create({ email, otp: generatedOtp });

await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Vibe Cart - Password Reset Code",
      html: `<p>Your OTP code: <strong>${generatedOtp}</strong> (10 mins valid)</p>`
    });

    res.status(200).json({ message: "OTP email has sent." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, isError: true });
  }
    


});

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!isValidEmail(email)) {
      return res.status(403).json({ message: "Email address isn't valid", isError: true });
    }
    
    const userMatched = process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password;
    if (!userMatched) {
      return res.status(400).json({ message: "Invalid credentials", isError: true });
    }

    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET_KEY, { expiresIn: "1h" });
    const user = {
      fullName: "System Administrator",
      email: process.env.ADMIN_EMAIL,
      role: "admin"
    };

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "User not sign-in. Internal Server Error.", error, isError: true });
  }
});

router.get("/admin", verifyUser, async (req, res) => {
  try {
    
    const { email, role } = req.user;

    
    if (role !== "admin" || email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied. Not an admin.", isError: true });
    }
    const adminProfile = {
      fullName: "System Administrator",
      email: process.env.ADMIN_EMAIL,
      role: "admin"
    };

    return res.status(200).json({ message: "Admin profile found", user: adminProfile });

  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error.", error, isError: true });
  }
});




router.post("/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await doctorModel.findOne({ email });
    if (!user) {
      return res.status(401).json({message: "Invalid credentials", isError: true });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({  message: "Invalid credentials",isError: true });
    }

    const token = jwt.sign({ id: user._id, role: "doctor" }, JWT_SECRET_KEY, { expiresIn: "1h" });
    

    const doctorUser = { ...user.toObject(), role: "doctor" };
    delete doctorUser.password;

    res.json({ message: "Login successful", token, user: doctorUser,isError: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", isError: true });
  }
});

router.get("/doctor", verifyUser, async (req, res) => {
    try {
        const { id } = req.user; // Token sign karte waqt jo id di thi (user._id)
        const doctorProfile = await doctorModel.findById(id).select("-password");
        
        if (!doctorProfile) {
            return res.status(404).json({ message: "Doctor profile not found", isError: true });
        }

        const user = { ...doctorProfile.toObject(), role: "doctor" };

        return res.status(200).json({ message: "Doctor profile found", user });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ message: "Internal Server Error.", error, isError: true });
    }
});




module.exports=router;