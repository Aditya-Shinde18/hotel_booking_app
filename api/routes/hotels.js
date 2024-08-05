import express from "express";
import hotel from "../models/hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel );

router.put("/:id",verifyAdmin, updateHotel);

router.delete("/:id",verifyAdmin, deleteHotel);

router.get("/find/:id",getHotel);

router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
