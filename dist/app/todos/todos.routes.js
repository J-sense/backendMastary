"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("../server");
const todosRoutes = express_1.default.Router();
todosRoutes.post('/create-todos', async (req, res) => {
    const db = await server_1.client.db("todosDb");
    const collection = db.collection("todos");
    const result = await collection.insertOne({
        title: req.body.title,
        description: req.body.description,
    });
    res.json({
        success: true,
        message: "Todo fetched successfully",
        data: result
    });
});
todosRoutes.get('/get-errors', async (req, res, next) => {
    try {
        console.log('jdskfdjfkj');
    }
    catch (error) {
        next(error);
    }
});
exports.default = todosRoutes;
//# sourceMappingURL=todos.routes.js.map