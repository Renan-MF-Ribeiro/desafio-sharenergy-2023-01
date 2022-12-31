require("dotenv").config();
const mongoose = require("mongoose");
const { connect } = require("../../utils/connect");

connect();

const optionsSchema = {
  strict: "throw",
  timestamps: true,
  collation: { locale: "en_US", strength: 1 },
};
const userSchema = new mongoose.Schema({
    createDate: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    networkLogin: { type: String, trim: true },
    password: { type: Array, default: [] },
    profilePhoto: { type: String, trim: true, required: false },
    birthDate: { type: String, trim: true },
}, { ...optionsSchema });

const User = mongoose.model('users', userSchema)

module.exports = {User}
