import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running in ${process.env.NODE_ENV} mode`);
});

app.listen(port, () => {
  console.log(
    `Server running at http://localhost:${port} in ${process.env.NODE_ENV} mode`
  );
});
