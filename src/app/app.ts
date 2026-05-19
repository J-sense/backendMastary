/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./routes/route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app: Application = express();
export const port = 4000;
app.use(express.json());

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Worldsss");
});

app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
