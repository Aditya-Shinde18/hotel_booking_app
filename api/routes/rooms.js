import express from "express";
import { verifyAdmin } from "../controllers/auth.js";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";

const router = express.Router()

router.post("/:hotelid", verifyAdmin, createRoom );

router.put("/:id",verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);

router.get("/:id",getRoom);

router.get("/", getAllRoom);

export default router