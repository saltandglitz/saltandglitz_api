const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image01: { type: String },
  image02: { type: String },
  image03: { type: String },
  price14KT: { type: String },
  id: { type: String },
});

const Upload = mongoose.model("Upload", UploadSchema);

module.exports = Upload;