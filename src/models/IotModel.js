const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
    waterLevel: { type: Number, required: true },
    updatedDate: { type: Date, default: Date.now }
  }, { versionKey: false });
  
  const IotModel = mongoose.model("iot", DataSchema);
  module.exports = IotModel;