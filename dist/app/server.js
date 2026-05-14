"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
// import app, { port } from "./app";
// import dotenv from "dotenv";
const app_1 = __importStar(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
// dotenv.config();
// const uri = process.env.MONGODB_URI as string;
// console.log(uri)
// export let db: Db;
const uri = "mongodb://todosForPractise:Lr0TPXK9UQd2MWTm@ac-ablksvv-shard-00-00.mf78gev.mongodb.net:27017,ac-ablksvv-shard-00-01.mf78gev.mongodb.net:27017,ac-ablksvv-shard-00-02.mf78gev.mongodb.net:27017/?ssl=true&replicaSet=atlas-nfj8ji-shard-0&authSource=admin&appName=Cluster0";
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// const bootstrap = async () => {
//   try {
//     await client.connect();
//     db = client.db("todosDb");
//     console.log("Connected to MongoDB!");
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     process.exit(1); // stop server if DB fails
//   }
// };
// bootstrap();
let server;
const bootstrap = async () => {
    await mongoose_1.default.connect(uri);
    server = app_1.default.listen(app_1.port, async () => {
        console.log(`Server running on port ${app_1.port}`);
    });
};
bootstrap();
//# sourceMappingURL=server.js.map