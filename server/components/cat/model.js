require("dotenv").config();
const mongoose = require("mongoose");
const { connect } = require("../../utils/connect");

connect();

const optionsSchema = {
  strict: "throw",
  timestamps: true,
  collation: { locale: "en_US", strength: 1 },
};
const catSchema = new mongoose.Schema(
  {
    createDate: { type: String, trim: true },
    label: { type: String, trim: true },
    status: { type: Array },
  },
  { ...optionsSchema }
);

const Cat = mongoose.model("cats", catSchema);

module.exports = { Cat };
