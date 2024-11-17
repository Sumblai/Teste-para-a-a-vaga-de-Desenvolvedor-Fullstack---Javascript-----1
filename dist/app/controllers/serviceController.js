"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addService = addService;
exports.updateService = updateService;
exports.deleteService = deleteService;
exports.updateBalance = updateBalance;
exports.updateAvailableSlots = updateAvailableSlots;
const Service_1 = __importDefault(require("../../domain/entities/Service"));
const ServiceRepository_1 = require("../../infrastructure/repositories/ServiceRepository");
const User_1 = __importDefault(require("../../domain/entities/User"));
const serviceRepository = new ServiceRepository_1.ServiceRepository();
function addService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, price, providerId } = req.body;
        try {
            const user = yield User_1.default.findById(providerId);
            if (!user || user.role !== "prestador") {
                res
                    .status(403)
                    .json({ message: "Access denied. You are not a provider." });
                return;
            }
            const service = new Service_1.default({ name, description, price, providerId });
            const savedService = yield serviceRepository.create(service);
            res.json({
                message: "Service created",
                serviceId: savedService._id,
            });
        }
        catch (error) {
            res.status(400).json({ message: "Error creating service", error });
            return;
        }
    });
}
function updateService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serviceId, name, description, price, providerId } = req.body;
        try {
            const user = yield User_1.default.findById(providerId);
            if (!user || user.role !== "prestador") {
                res
                    .status(403)
                    .json({ message: "Access denied. You are not a provider." });
                return;
            }
            const service = yield Service_1.default.findById(serviceId);
            if (!service) {
                res.status(404).json({ message: "Service not found" });
                return;
            }
            if (service.providerId.toString() !== providerId) {
                res.status(403).json({
                    message: "Access denied. This service does not belong to you.",
                });
                return;
            }
            service.name = name || service.name;
            service.description = description || service.description;
            service.price = price || service.price;
            const updatedService = yield service.save();
            res.json({ message: "Service updated", service: updatedService });
        }
        catch (error) {
            res.status(400).json({ message: "Error updating service", error });
        }
    });
}
function deleteService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serviceId, providerId } = req.body;
        try {
            const user = yield User_1.default.findById(providerId);
            if (!user || user.role !== "prestador") {
                res
                    .status(403)
                    .json({ message: "Access denied. You are not a provider." });
                return;
            }
            const service = yield Service_1.default.findById(serviceId);
            if (!service) {
                res.status(404).json({ message: "Service not found" });
                return;
            }
            if (service.providerId.toString() !== providerId) {
                res.status(403).json({
                    message: "Access denied. This service does not belong to you.",
                });
                return;
            }
            yield Service_1.default.findByIdAndDelete(serviceId);
            res.json({ message: "Service deleted" });
        }
        catch (error) {
            res.status(400).json({ message: "Error deleting service", error });
            return;
        }
    });
}
function updateBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clientId, amount } = req.body;
        try {
            const user = yield User_1.default.findById(clientId);
            if (!user || user.role !== "cliente") {
                res.status(403).json({ message: "Only clients can update balance" });
                return;
            }
            user.balance = (user.balance || 0) + amount;
            yield user.save();
            res.json({
                message: "Balance updated successfully",
                balance: user.balance,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating balance", error });
        }
    });
}
function updateAvailableSlots(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serviceId, availableSlots } = req.body;
        try {
            const service = yield Service_1.default.findById(serviceId);
            if (!service) {
                res.status(404).json({ message: "Service not found" });
                return;
            }
            service.availableSlots = availableSlots;
            yield service.save();
            res.json({
                message: "Available slots updated successfully",
                availableSlots: service.availableSlots,
            });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating available slots", error });
        }
    });
}
