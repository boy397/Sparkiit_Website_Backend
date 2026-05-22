"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHorizontalScrollItem = exports.updateHorizontalScrollItem = exports.createHorizontalScrollItem = exports.getAllHorizontalScrollItemsAdmin = void 0;
const HorizontalScrollItem_1 = __importDefault(require("../models/HorizontalScrollItem"));
// GET /api/admin/horizontal-scroll
const getAllHorizontalScrollItemsAdmin = async (_req, res) => {
    try {
        const items = await HorizontalScrollItem_1.default.find().sort({ order: 1 });
        res.json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.getAllHorizontalScrollItemsAdmin = getAllHorizontalScrollItemsAdmin;
// POST /api/admin/horizontal-scroll
const createHorizontalScrollItem = async (req, res) => {
    try {
        const item = await HorizontalScrollItem_1.default.create(req.body);
        res.status(201).json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.createHorizontalScrollItem = createHorizontalScrollItem;
// PUT /api/admin/horizontal-scroll/:id
const updateHorizontalScrollItem = async (req, res) => {
    try {
        const item = await HorizontalScrollItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.updateHorizontalScrollItem = updateHorizontalScrollItem;
// DELETE /api/admin/horizontal-scroll/:id
const deleteHorizontalScrollItem = async (req, res) => {
    try {
        const item = await HorizontalScrollItem_1.default.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ success: false, message: 'Item not found' });
            return;
        }
        res.json({ success: true, message: 'Item deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.deleteHorizontalScrollItem = deleteHorizontalScrollItem;
