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
  state: {
    type: String,
    default: "pending",
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
  },
  priority: {
    type: Number,
  },
  country: {
    type: String,
  },
  coord: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Reports", ReportSchema);
