"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireClientRole = requireClientRole;
exports.requireProviderRole = requireProviderRole;
function requireClientRole(req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "cliente") {
        res.status(403).json({ message: "Access restricted to clients only" });
        return;
    }
    next();
}
function requireProviderRole(req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "prestador") {
        res.status(403).json({ message: "Access restricted to providers only" });
        return;
    }
    next();
}
