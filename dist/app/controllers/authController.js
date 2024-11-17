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
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Jwt_1 = require("../../utils/Jwt");
const UserRepository_1 = require("../../infrastructure/repositories/UserRepository");
const User_1 = __importDefault(require("../../domain/entities/User"));
const userRepository = new UserRepository_1.UserRepository();
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, nif, email, password, role } = req.body;
        const nifRegex = /^\d{9}$/;
        if (!nifRegex.test(nif)) {
            res.status(400).json({ message: "NIF must have exactly 9 digits" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ name, nif, email, password: hashedPassword, role });
        try {
            const savedUser = yield userRepository.create(user);
            res.json({
                message: "User created",
                userId: savedUser._id,
                user: savedUser,
            });
        }
        catch (error) {
            res.status(400).json({ message: "Error creating user", error });
            console.log(error);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield userRepository.findByEmail(email);
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            const token = (0, Jwt_1.generateToken)({ id: user._id, role: user.role });
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.json({ token, user });
        }
        catch (error) {
            next(error);
        }
    });
}
