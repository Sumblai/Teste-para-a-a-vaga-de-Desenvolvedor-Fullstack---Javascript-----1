"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// routes.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("./app/controllers/authController");
const serviceController_1 = require("./app/controllers/serviceController");
//import { sanitizeInput } from "./utils/security";
const Jwt_1 = require("./utils/Jwt");
const rolemiddlewares_1 = require("./utils/rolemiddlewares");
const bookingController_1 = require("./app/controllers/bookingController");
const security_1 = require("./utils/security");
const router = express_1.default.Router();
exports.router = router;
router.post("/register", security_1.validateInputs, security_1.validateAndSanitize, authController_1.register);
router.post("/login", security_1.loginLimiter, security_1.validateInputs, security_1.validateAndSanitize, authController_1.login);
router.post("/service", Jwt_1.authenticateJWT, rolemiddlewares_1.requireProviderRole, serviceController_1.addService);
router.put("/updateService", Jwt_1.authenticateJWT, rolemiddlewares_1.requireProviderRole, serviceController_1.updateService);
router.delete("/deleteService", Jwt_1.authenticateJWT, rolemiddlewares_1.requireProviderRole, serviceController_1.deleteService);
router.post("/booking", Jwt_1.authenticateJWT, rolemiddlewares_1.requireClientRole, bookingController_1.createBooking);
router.put("/updateBalance", Jwt_1.authenticateJWT, rolemiddlewares_1.requireClientRole, serviceController_1.updateBalance);
router.put("/updateSlots", Jwt_1.authenticateJWT, rolemiddlewares_1.requireProviderRole, serviceController_1.updateAvailableSlots);
router.get("/clientHistory/:clientId", Jwt_1.authenticateJWT, rolemiddlewares_1.requireClientRole, bookingController_1.getClientBookingHistory);
router.get("/providerHistory/:serviceId", Jwt_1.authenticateJWT, rolemiddlewares_1.requireProviderRole, bookingController_1.getServiceBookingHistory);
router.put("/booking/:bookingId/update-date", Jwt_1.authenticateJWT, rolemiddlewares_1.requireClientRole, bookingController_1.updateBookingDate);
router.delete("/booking/:bookingId", Jwt_1.authenticateJWT, rolemiddlewares_1.requireClientRole, bookingController_1.cancelBooking);