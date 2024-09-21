const multer = require("multer");
const { cloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");
const { param } = require("../routes/postRoute");

const storage = new cloudinaryStorage({
  cloudinary,
  params: {
    folder: "full-stack-blog-project",
    allowedFormats: ["jpg", "png"],
  },
});

const upload = multer({ storage });
module.exports = upload;
