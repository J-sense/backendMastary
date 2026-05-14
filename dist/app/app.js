"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const express_1 = __importDefault(require("express"));
const todos_routes_1 = __importDefault(require("./todos/todos.routes"));
const note_routes_1 = __importDefault(require("./myNote/note.routes"));
const app = (0, express_1.default)();
exports.port = 3000;
app.use(express_1.default.json());
app.use("/todos", todos_routes_1.default);
app.use("/notes", note_routes_1.default);
app.get('/', (req, res) => {
    console.log("djfkdsljf");
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map