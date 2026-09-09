const mongoose = require("mongoose")
const { Schema } = mongoose;

const scehma = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    status: { type: String, default: "active" },
    role: { type: String, default: "patient", enum: ["patient", "admin", "superAdmin","doctor"] },
    photo: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    },
    phone: { type: String, default: '000000000' },
    address: { type: Object, default: { line1: '', line2: '' } },
    gender: { type: String, default: 'Not Selected' },
    dob: { type: String, default: 'Not Selected' },
}, { timestamps: true });
const users = mongoose.model('users', scehma);
module.exports = users
