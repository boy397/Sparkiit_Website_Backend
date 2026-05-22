"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePageModel = exports.updatePageModel = exports.getPageBySlug = exports.createPageModel = exports.getAllPageModels = void 0;
const PageModel_1 = __importDefault(require("../models/PageModel"));
const getAllPageModels = async (req, res) => {
    try {
        const items = await PageModel_1.default.find();
        res.json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllPageModels = getAllPageModels;
const createPageModel = async (req, res) => {
    try {
        const { name, slug } = req.body;
        // Auto-generate slug if not provided
        const finalSlug = slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const newItem = new PageModel_1.default({
            ...req.body,
            slug: finalSlug
        });
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createPageModel = createPageModel;
const getPageBySlug = async (req, res) => {
    try {
        const item = await PageModel_1.default.findOne({ slug: { $regex: new RegExp(`^${req.params.slug}$`, 'i') } });
        if (!item) {
            res.status(404).json({ success: false, message: 'Page not found' });
            return;
        }
        res.json({ success: true, data: item });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getPageBySlug = getPageBySlug;
const updatePageModel = async (req, res) => {
    try {
        const updatedItem = await PageModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        }
        res.json({ success: true, data: updatedItem });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updatePageModel = updatePageModel;
const deletePageModel = async (req, res) => {
    try {
        const deletedItem = await PageModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        }
        res.json({ success: true, message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deletePageModel = deletePageModel;
