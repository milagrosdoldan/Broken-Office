const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  admin: {
    type: Number,
  },
  location: {
    type: String,
    required: true,
  },
  companyRole: {
    type: String,
  },
  state: {
    type: String,
    default: "pending",
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: number,
  },
});

module.exports = mongoose.model("Reports", ReportSchema);
