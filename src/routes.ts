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
import { authenticateJWT } from "./utils/Jwt";
import {
  requireClientRole,
  requireProviderRole,
} from "./utils/rolemiddlewares";
import {
  createBooking,
  getClientBookingHistory,
  getServiceBookingHistory,
  cancelBooking,
  updateBookingDate,
} from "./app/controllers/bookingController";

import {
  validateInputs,
  validateAndSanitize,
  loginLimiter,
} from "./utils/security";

const router = express.Router();

router.post("/register", validateInputs, validateAndSanitize, register);
router.post("/login", loginLimiter, validateInputs, validateAndSanitize, login);
router.post("/service", authenticateJWT, requireProviderRole, addService);
router.put(
  "/updateService",
  authenticateJWT,
  requireProviderRole,
  updateService
);
router.delete(
  "/deleteService",
  authenticateJWT,
  requireProviderRole,
  deleteService
);
router.post("/booking", authenticateJWT, requireClientRole, createBooking);
router.put("/updateBalance", authenticateJWT, requireClientRole, updateBalance);
router.put(
  "/updateSlots",
  authenticateJWT,
  requireProviderRole,
  updateAvailableSlots
);
router.get(
  "/clientHistory/:clientId",
  authenticateJWT,
  requireClientRole,
  getClientBookingHistory
);
router.get(
  "/providerHistory/:serviceId",
  authenticateJWT,
  requireProviderRole,
  getServiceBookingHistory
);

router.put(
  "/booking/:bookingId/update-date",
  authenticateJWT,
  requireClientRole,
  updateBookingDate
);
router.delete(
  "/booking/:bookingId",
  authenticateJWT,
  requireClientRole,
  cancelBooking
);

export { router };
