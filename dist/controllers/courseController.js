"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
// GET /api/admin/courses
const getAllCourses = async (req, res) => {
    try {
        const { search, status, category, batchStatus, minPrice, maxPrice, sortBy, level, instructorId, isPopular, showHomepage } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }
        if (status)
            filter.status = status;
        if (category)
            filter.category = category;
        if (batchStatus)
            filter.batchStatus = batchStatus;
        if (level)
            filter.level = level;
        if (instructorId)
            filter.instructorId = instructorId;
        if (isPopular !== undefined)
            filter.isPopular = isPopular === 'true';
        if (showHomepage !== undefined)
            filter.showHomepage = showHomepage === 'true';
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        let sortOption = { createdAt: -1 };
        if (sortBy === 'price_asc')
            sortOption = { price: 1 };
        else if (sortBy === 'price_desc')
            sortOption = { price: -1 };
        else if (sortBy === 'newest')
            sortOption = { createdAt: -1 };
        else if (sortBy === 'oldest')
            sortOption = { createdAt: 1 };
        const courses = await Course_1.default.find(filter).sort(sortOption).populate('instructorId', 'name email');
        res.json({ success: true, data: courses, count: courses.length });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.getAllCourses = getAllCourses;
// GET /api/admin/courses/:id
const getCourseById = async (req, res) => {
    try {
        const course = await Course_1.default.findById(req.params.id).populate('instructorId', 'name email');
        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }
        res.json({ success: true, data: course });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.getCourseById = getCourseById;
// POST /api/admin/courses
const createCourse = async (req, res) => {
    try {
        const course = await Course_1.default.create(req.body);
        res.status(201).json({ success: true, data: course });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createCourse = createCourse;
// PUT /api/admin/courses/:id
const updateCourse = async (req, res) => {
    try {
        const course = await Course_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }
        res.json({ success: true, data: course });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateCourse = updateCourse;
// DELETE /api/admin/courses/:id
const deleteCourse = async (req, res) => {
    try {
        const course = await Course_1.default.findByIdAndDelete(req.params.id);
        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }
        res.json({ success: true, message: 'Course deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.deleteCourse = deleteCourse;
