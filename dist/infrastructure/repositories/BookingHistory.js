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
const BookingHistory_1 = __importDefault(require("../../domain/entities/BookingHistory"));
class BookingHistoryRepository {
    create(history) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHistory = new BookingHistory_1.default(history);
            yield newHistory.save();
            return newHistory;
        });
    }
    findAllByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookingHistory_1.default.find({ clientId }).exec();
        });
    }
    findAllByBookingId(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookingHistory_1.default.find({ bookingId }).exec();
        });
    }
    findById(historyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookingHistory_1.default.findById(historyId).exec();
        });
    }
}
exports.default = BookingHistoryRepository;
