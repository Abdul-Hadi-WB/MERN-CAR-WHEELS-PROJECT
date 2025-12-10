import express from "express";
const adsRoute = express.Router();
import * as ads from "../controllers/ads.controller.js";
// import { requriedLoggedIn } from "../middlewares/authMiddleware.js";

// Upload image
adsRoute.post("/upload-image", ads.uploadImage);

// Delete image
adsRoute.post("/delete-image", ads.deleteImage);

export default adsRoute;