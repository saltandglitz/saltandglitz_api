const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  id: { type: String, required: true }, // SKU field
  title: { type: String, required: true },
  price14KT: { type: Number, required: true },
  price18KT: { type: Number, required: true },
  image01: { type: String, required: true }, 
  category: { type: String, required: true },
  diamondprice: { type: Number, required: true },
  makingCharge14KT: { type: Number, required: true },
  makingCharge18KT: { type: Number, required: true },
  grossWt: { type: Number, required: true },
  gst14KT: { type: Number, required: true },
  gst18KT: { type: Number, required: true },
  total14KT: { type: Number, required: true },
  total18KT: { type: Number, required: true },
});

const Upload = mongoose.model("Upload", UploadSchema);

module.exports = Upload;
