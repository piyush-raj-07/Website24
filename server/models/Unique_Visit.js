const mongoose = require("mongoose");

const UniqueSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstVisit: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Unique_Visit", UniqueSchema);
