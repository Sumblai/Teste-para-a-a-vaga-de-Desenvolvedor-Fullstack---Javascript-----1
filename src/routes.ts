// routes.ts
import express from "express";
import { register, login } from "./app/controllers/authController";
import {
  addService,
  deleteService,
  updateAvailableSlots,
  updateBalance,
  updateService,
} from "./app/controllers/serviceController";

//import { sanitizeInput } from "./utils/security";
import { verifyToken } from "./utils/Jwt";
import { createBooking } from "./app/controllers/bookingController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/service", addService);
router.put("/updateService", updateService);
router.delete("/deleteService", deleteService);
router.post("/booking", createBooking);
router.put("/updateBalance", updateBalance)
router.put("updateSlots", updateAvailableSlots)

export { router };
