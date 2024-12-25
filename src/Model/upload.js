const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  id: { type: String, required: true }, // SKU field
  title: { type: String, required: true },
<<<<<<< HEAD
  price14KT: { type: Number, required: true },
  price18KT: { type: Number, required: true },
  image01: { type: String, required: true }, // Assuming you store the image filename/path
  category: { type: String, required: true },
  diamondprice: { type: Number, required: true },
  makingCharge14KT: { type: Number, required: true },
  makingCharge18KT: { type: Number, required: true },
  grossWt: { type: Number, required: true },
  gst14KT: { type: Number, required: true },
  gst18KT: { type: Number, required: true },
  total14KT: { type: Number, required: true },
  total18KT: { type: Number, required: true }
=======
  price: { type: Number, required: true },
  category: { type: String },
  image01: { type: String },
  image02: { type: String },
  image03: { type: String },
  price14KT: { type: String },
  id: { type: String },
>>>>>>> 26514b58cee2874e35da92becdf259bfba16b5f0
});

const Upload = mongoose.model("Upload", UploadSchema);

module.exports = Upload;
