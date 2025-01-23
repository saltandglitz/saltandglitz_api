const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema(
  {
      id: { type: String, required: true },
      title: { type: String, required: true },
      gender: { type: String, required: true },
      price14KT: { type: Number, required: true },
      price18KT: { type: Number, required: true },
      image01: { type: String, required: true },
      image02: { type: String, required: false },
      image03: { type: String, required: false },
      video: { type: String, required: false },
      category: { type: String, required: true },
      diamondprice: { type: Number, required: true },
      makingCharge14KT: { type: Number, required: true },
      makingCharge18KT: { type: Number, required: true },
      grossWt: { type: Number, required: true },
      netWeight14KT: { type: Number, required: true },
      netWeight18KT: { type: Number, required: true },
      gst14KT: { type: Number, required: true },
      gst18KT: { type: Number, required: true },
      total14KT: { type: Number, required: true },
      total18KT: { type: Number, required: true },
  },
  { timestamps: true }
);
const Upload = mongoose.model("Upload", UploadSchema);

module.exports = Upload;                        
