"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollaborator = exports.updateCollaborator = exports.createCollaborator = exports.getAllCollaborators = void 0;
const Collaborator_1 = __importDefault(require("../models/Collaborator"));
const getAllCollaborators = async (req, res) => {
    try {
        const items = await Collaborator_1.default.find().sort({ order: 1 });
        res.json({ success: true, data: items });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllCollaborators = getAllCollaborators;
const createCollaborator = async (req, res) => {
    try {
        const newItem = new Collaborator_1.default(req.body);
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createCollaborator = createCollaborator;
const updateCollaborator = async (req, res) => {
    try {
        const updatedItem = await Collaborator_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
exports.updateCollaborator = updateCollaborator;
const deleteCollaborator = async (req, res) => {
    try {
        const deletedItem = await Collaborator_1.default.findByIdAndDelete(req.params.id);
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
exports.deleteCollaborator = deleteCollaborator;
