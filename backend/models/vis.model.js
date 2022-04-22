const mongoose = require("mongoose");

const visSchema = new mongoose.Schema({
  prefix: {
    type: String,
    required: true,
    unique: true,
  },
  date: { type: String, required: true },
  withdrawals: { type: String, required: true },
  nb_ann : {type:Number, default:0, required: true},
});

module.exports = mongoose.model('Vis', visSchema);