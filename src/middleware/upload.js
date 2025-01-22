const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dzmpsdk1k",
  api_key: "653418359984731",
  api_secret: "aAB9o_pIAat8n3tP57vI_JvffV0",
});

let uploadImage = (path, originalname) => {
  return cloudinary.uploader.upload(
    path,
    { public_id: `${originalname}` },
    function (error, result) {
      return result;
    }
  );
};

module.exports = uploadImage;