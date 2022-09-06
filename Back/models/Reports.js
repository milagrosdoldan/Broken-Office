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
  puesto: {
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
  priotiy: {
    type: number,
  },
});

module.exports = mongoose.model("Reports", ReportSchema);
