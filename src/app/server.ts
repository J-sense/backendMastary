import { MongoClient, ServerApiVersion } from "mongodb";

import { Server } from "http";
import app, { port } from "./app";
import mongoose from "mongoose";
import { envVars } from "./config/envVars";
const uri =
  "mongodb://todosForPractise:Lr0TPXK9UQd2MWTm@ac-ablksvv-shard-00-00.mf78gev.mongodb.net:27017,ac-ablksvv-shard-00-01.mf78gev.mongodb.net:27017,ac-ablksvv-shard-00-02.mf78gev.mongodb.net:27017/?ssl=true&replicaSet=atlas-nfj8ji-shard-0&authSource=admin&appName=Cluster0";

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
bootstrap();
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
