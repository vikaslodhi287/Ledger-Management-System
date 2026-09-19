const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required for creating an acount"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"], // email rigex
        unique: [true, "Email already exist"]
    },
    name:{
        type: String,
        required: [true, "Name is required for creating  an acount"]
    },
    password:{
        type: String,
        required: [true, "Password is required for creating an acount"],
        minlength: [6, "Password should contain more than 6 character"],
        select: false
    },
    systemUser: {
        type: Boolean,
        default: false,
        immutable: true,
        select: false,
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function  (next) {

    if(!this.isModified("password")){
        return;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return;

})

userSchema.methods.comparePassword = async function(password) {
    return  await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;