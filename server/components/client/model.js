require("dotenv").config();
const mongoose = require("mongoose");
const { connect } = require("../../utils/connect");

connect();

const optionsSchema = {
  strict: "throw",
  timestamps: true,
  collation: { locale: "en_US", strength: 1 },
};
const clientSchema = new mongoose.Schema(
  {
    createDate: { type: String, trim: true },
    number: { type: String, trim: true, require },
    cell: { type: String, trim: true, require },
    city: { type: String, trim: true, require },
    district: { type: String, trim: true, require },
    cpf: { type: String, trim: true, require },
    email: { type: String, trim: true, require },
    name: { type: String, trim: true, require },
    phone: { type: String, trim: true, require },
    state: { type: String, trim: true, require },
    street: { type: String, trim: true, require },
    picture: { type: String, trim: true },
  },
  { ...optionsSchema }
);

const Client = mongoose.model("clients", clientSchema);

module.exports = { Client };
