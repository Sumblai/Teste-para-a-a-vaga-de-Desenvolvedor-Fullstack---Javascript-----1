"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.authenticateJWT = void 0;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
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
const logout = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "No authentication token provided." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const { userId } = req.params;
        if (userId !== decoded.id) {
            res
                .status(401)
                .json({ message: "User ID does not match the authenticated user." });
            return;
        }
        res.clearCookie("token", {
            httpOnly: true,
        });
        res.status(200).json({ message: "Logged out successfully." });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "An error occurred during logout." });
        return;
    }
};
exports.logout = logout;
