/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ServerApiVersion } from "mongodb";

import { Server } from "http";
import app, { port } from "./app";
import mongoose from "mongoose";
import { envVars } from "./config/envVars";
import { createSuperAdmin } from "./utils/createSuperAdmin";

export const client = new MongoClient(envVars.DB_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let server: Server;
const bootstrap = async () => {
  console.log(envVars.NODE_ENV);
  await mongoose.connect(envVars.DB_URL as string);
  server = app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
  });
};
(async () => {
  await bootstrap();
  await createSuperAdmin();
})();

process.on("unhandledRejection", (err: any) => {
  console.log("server gracefully shut down for unhandledRejection", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err: any) => {
  console.log("server gracefully shut down for uncaughtException", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      console.log("server gracefully shut down for SIGTERM");
    });
  }
  process.exit(1);
});
