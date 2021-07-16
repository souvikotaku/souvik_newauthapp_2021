const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newaptuserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyname: { type: String, required: true },
    registrationdate: { type: String, required: true },
    countryoforigin: { type: String, required: true },
    type: { type: String, required: true },
  },

  { timestamps: true }
);

const Newaptuser = mongoose.model("newaptuser", newaptuserSchema);

module.exports = Newaptuser;
