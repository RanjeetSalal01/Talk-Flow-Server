"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUploader = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Export the uploader object directly to access upload_stream
exports.cloudinaryUploader = cloudinary_1.v2.uploader;
//# sourceMappingURL=cloudinary.js.map