import mongoose from "mongoose";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/User";
// import generator from 'generator'
// use save to run validators again because find and update wont

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true, //not a validator but transforms string
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    select: false, //Keeps password hidden from anywhere
    minlength: 6,
    required: [true, "User must have a password"],
    // default: generator.generate({
    // 	length: 6,
    // 	numbers: true
    // })
  },
  images: {
    type: [String],
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  lastEdited: Date,
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Middleware

userSchema.pre<IUser>(/^find/, function (next) {
  // 'this' points to the current query before executing the event /^find/
  if (this instanceof mongoose.Query)
    this.find({ active: { $ne: false } }).select("-__v");
  next();
});
// update changedPasswordAt when resetting password
// Skips if password is NOT modified or NEW.
userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // subtracting 1 second takes into account delay in saving into database so that its before the token is generated
  next();
});

userSchema.pre<IUser>("save", async function (next) {
  // Only run this function if password was actually modified
  // Changing password or password creation eg. new password
  if (!this.isModified("password")) return next();
  const saltRounds = 12;
  if (this.password)
    this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

const Users = mongoose.model<IUser>("Users", userSchema);
module.exports = Users;
