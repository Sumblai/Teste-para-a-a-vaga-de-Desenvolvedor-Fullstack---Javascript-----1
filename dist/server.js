"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongo_db_1 = require("./infrastructure/database/mongo_db");
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const vite = 5173;
const ORIGIN = `http://localhost:${vite}`;
app.get("/", (req, res) => {
    res.send(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});
const corsOptions = {
    origin: ORIGIN,
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/app/bulir", routes_1.router);
app.use((0, cors_1.default)());
(0, mongo_db_1.connectDB)();
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
});
