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
exports.cancelBooking = void 0;
exports.createBooking = createBooking;
exports.getClientBookingHistory = getClientBookingHistory;
exports.getServiceBookingHistory = getServiceBookingHistory;
exports.updateBookingDate = updateBookingDate;
const Booking_1 = __importDefault(require("../../domain/entities/Booking"));
const Service_1 = __importDefault(require("../../domain/entities/Service"));
const User_1 = __importDefault(require("../../domain/entities/User"));
const BookingHistory_1 = __importDefault(require("../../domain/entities/BookingHistory"));
function createBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clientId, serviceId, reservationDate } = req.body;
        try {
            const client = yield User_1.default.findById(clientId);
            const service = yield Service_1.default.findById(serviceId);
            if (!client || !service) {
                res.status(404).json({ message: "Client or service not found" });
                return;
            }
            if (client.balance === undefined || client.balance < service.price) {
                res.status(400).json({ message: "Insufficient balance" });
                return;
            }
            if (service.availableSlots <= 0) {
                res.status(400).json({ message: "No available slots for this service" });
                return;
            }
            const reservationDateTime = new Date(reservationDate);
            const now = new Date();
            if (reservationDateTime < now) {
                res
                    .status(400)
                    .json({ message: "Reservation date must be in the future" });
                return;
            }
            const existingBooking = yield Booking_1.default.findOne({
                clientId,
                serviceId,
                reservationDate: reservationDateTime,
            });
            if (existingBooking) {
                res.status(400).json({
                    message: "You already have a booking for this date and service",
                });
                return;
            }
            const booking = new Booking_1.default({
                clientId,
                serviceId,
                reservationDate: reservationDateTime,
            });
            yield booking.save();
            client.balance -= service.price;
            service.availableSlots -= 1;
            yield client.save();
            yield service.save();
            res.json({ message: "Booking successful", booking });
        }
        catch (error) {
            res.status(500).json({ message: "Error creating booking", error });
        }
    });
}
function getClientBookingHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { clientId } = req.params;
        try {
            const bookings = yield Booking_1.default.find({ clientId })
                .populate({
                path: "serviceId",
                select: "name description price",
            })
                .sort({ createdAt: -1 });
            res.json({ bookings });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error retrieving client booking history", error });
        }
    });
}
function getServiceBookingHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serviceId } = req.params;
        try {
            const bookings = yield Booking_1.default.find({ serviceId })
                .populate({
                path: "clientId",
                select: "name email",
            })
                .sort({ createdAt: -1 });
            res.json({ bookings });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error retrieving service booking history", error });
        }
    });
}
function updateBookingDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bookingId } = req.params;
        const { newReservationDate } = req.body;
        try {
            const booking = yield Booking_1.default.findById(bookingId);
            if (!booking) {
                res.status(404).json({ message: "Booking not found" });
                return;
            }
            const client = yield User_1.default.findById(booking.clientId);
            if (!client) {
                res.status(404).json({ message: "Client not found" });
                return;
            }
            const newDate = new Date(newReservationDate);
            const now = new Date();
            if (newDate < now) {
                res
                    .status(400)
                    .json({ message: "New reservation date must be in the future" });
                return;
            }
            const existingBooking = yield Booking_1.default.findOne({
                clientId: booking.clientId,
                serviceId: booking.serviceId,
                reservationDate: newDate,
            });
            if (existingBooking) {
                res.status(400).json({
                    message: "You already have a booking for this date and service",
                });
                return;
            }
            booking.reservationDate = newDate;
            yield booking.save();
            res.json({ message: "Booking date updated successfully", booking });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating booking date", error });
        }
    });
}
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const { clientId } = req.body;
    try {
        const booking = yield Booking_1.default.findById(bookingId);
        if (!booking) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        if (booking.clientId.toString() !== clientId) {
            res
                .status(403)
                .json({ message: "You are not authorized to cancel this booking" });
            return;
        }
        const previousData = {
            clientId: booking.clientId,
            serviceId: booking.serviceId,
            reservationDate: booking.reservationDate,
            createdAt: booking.createdAt,
        };
        const history = new BookingHistory_1.default({
            bookingId: booking._id,
            previousData,
            newData: {},
        });
        yield history.save();
        yield booking.deleteOne();
        res.status(200).json({
            message: "Booking canceled successfully",
            history,
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error canceling booking", error });
        return;
    }
});
exports.cancelBooking = cancelBooking;
exports.default = exports.cancelBooking;
