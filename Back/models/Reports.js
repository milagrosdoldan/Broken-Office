const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  admin: {
    type: Number,
  },
  location: {
    type: String,
    // required: true,
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
    // required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
  },
  country: {
    type: String,
  },
  coord: {
    type: Array,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model("Reports", ReportSchema);
