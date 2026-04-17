import express from "express";
import { authenticate } from "../../common/middleware/auth.middleware.js";
import { addHotel, getMyHotel, getAllHotels } from "../controllers/hotel.controller.js";

const router = express.Router();

router.post("/add", authenticate, addHotel);
router.get("/my-hotel", authenticate, getMyHotel);
router.get("/all", getAllHotels);

export default router;
