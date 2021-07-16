const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aptadminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyname: { type: String, required: true },
    registrationdate: { type: String, required: true },
    countryoforigin: { type: String, required: true },
    technologyname: { type: String, required: true },
    type: { type: String, required: true },
  },

  { timestamps: true }
);

const Newaptadmin = mongoose.model("newaptadmin", aptadminSchema);

module.exports = Newaptadmin;
