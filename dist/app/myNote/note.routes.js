"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const noteRoutes = express_1.default.Router();
const noteSchema = new mongoose_1.default.Schema({
    title: String,
    description: String
});
const Note = mongoose_1.default.model("Note", noteSchema);
noteRoutes.post('/create-note', async (req, res, next) => {
    try {
        const result = await Note.create(req.body);
        await result.save();
        res.status(201).json({
            success: true,
            message: "Note created successfullysssssssssssssss",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
noteRoutes.get('/get-notes', async (req, res, next) => {
    const result = await Note.find();
    res.status(200).json({
        success: true,
        message: "Note fetched successfully",
        data: result
    });
});
noteRoutes.get("/get-notes/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Note.findById(id);
        res.status(201).json({
            success: true,
            message: "Note fetched successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
noteRoutes.patch("/update-note/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = await Note.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = noteRoutes;
//# sourceMappingURL=note.routes.js.map