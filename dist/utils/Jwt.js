"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token extraido : ", token);
    if (!token) {
        res.status(401).json({ message: "Access token is missing or invalid" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateJWT = authenticateJWT;
