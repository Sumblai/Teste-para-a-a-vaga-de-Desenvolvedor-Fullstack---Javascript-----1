"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLimiter = exports.validateAndSanitize = exports.validateInputs = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_validator_1 = require("express-validator");
exports.validateInputs = [
    (0, express_validator_1.body)("name").trim().escape(),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please provide a valid email address in the format: user@example.com.")
        .normalizeEmail(),
    (0, express_validator_1.body)("message").trim().escape(),
];
const validateAndSanitize = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const customErrors = errors.array().map((error) => ({
            message: error.msg,
        }));
        res.status(400).json({ errors: customErrors });
        return;
    }
    next();
};
exports.validateAndSanitize = validateAndSanitize;
exports.loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 40,
    message: "Too many login attempts, please try again later.",
});
