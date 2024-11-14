import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./infrastructure/database/mongo_db";
dotenv.config();
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running in ${process.env.NODE_ENV} mode`);
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/app/bulir", router);
app.use(cors());
connectDB();

app.listen(port, () => {
  console.log(
    `Server running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
  );
});
