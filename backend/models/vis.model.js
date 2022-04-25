const mongoose = require("mongoose");

const visSchema = new mongoose.Schema({
  resource: {
    type: String,
    required: true,
    unique: true,
  },
  starttime: { type: String, required: true, unique: true, },
  announcements : {type:Number, default:0, required: true},
});

module.exports = mongoose.model('Vis', visSchema);