"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.submitProject = exports.getStudentTests = exports.getStudentCertificates = exports.getDashboardData = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Candidate_1 = __importDefault(require("../models/Candidate"));
const Certificate_1 = __importDefault(require("../models/Certificate"));
const Test_1 = __importDefault(require("../models/Test"));
const Submission_1 = __importDefault(require("../models/Submission"));
const Setting_1 = __importDefault(require("../models/Setting"));
// @desc    Get student dashboard data
// @route   GET /api/public/dashboard
// @access  Private/Candidate
exports.getDashboardData = (0, express_async_handler_1.default)(async (req, res) => {
    const candidate = await Candidate_1.default.findById(req.user?._id).populate('enrolledCourses');
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }
    const skillSetting = await Setting_1.default.findOne({ key: 'skill_categories' });
    let skillCategories = [];
    if (skillSetting && skillSetting.value) {
        try {
            skillCategories = JSON.parse(skillSetting.value);
        }
        catch (e) {
            skillCategories = skillSetting.value.split(',').map((s) => ({
                id: s.trim().toLowerCase().replace(/\s+/g, '_'),
                name: s.trim()
            }));
        }
    }
    else {
        skillCategories = [
            { id: 'tech', name: 'Tech' },
            { id: 'soft_skills', name: 'Soft Skills' },
            { id: 'blockchain', name: 'Blockchain' },
            { id: 'smart_contracts', name: 'Smart Contracts' },
            { id: 'frontend', name: 'Frontend' },
            { id: 'ai', name: 'AI' },
            { id: 'system_design', name: 'System Design' }
        ];
    }
    const certificatesCount = await Certificate_1.default.countDocuments({ candidateEmail: candidate.email });
    res.json({
        success: true,
        data: {
            stats: candidate.performanceMetrics,
            enrolledCourses: candidate.enrolledCourses,
            tests: candidate.completedTests,
            projects: candidate.submittedProjects,
            batchRank: candidate.batchRank,
            stipendEligible: candidate.stipendEligible,
            skills: candidate.skills,
            paymentDetails: candidate.paymentDetails,
            certificatesCount: certificatesCount,
            name: candidate.name,
            email: candidate.email,
            phone: candidate.phone,
            avatar: candidate.avatar || "",
            skillCategories: skillCategories
        }
    });
});
// @desc    Get student certificates
// @route   GET /api/public/dashboard/certificates
// @access  Private/Candidate
exports.getStudentCertificates = (0, express_async_handler_1.default)(async (req, res) => {
    const certificates = await Certificate_1.default.find({ candidateEmail: req.user?.email });
    res.json({ success: true, data: certificates });
});
// @desc    Get available tests for enrolled courses
// @route   GET /api/public/dashboard/tests
// @access  Private/Candidate
exports.getStudentTests = (0, express_async_handler_1.default)(async (req, res) => {
    const candidate = await Candidate_1.default.findById(req.user?._id);
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }
    const tests = await Test_1.default.find({ courseId: { $in: candidate.enrolledCourses } });
    res.json({ success: true, data: tests });
});
// @desc    Submit a project
// @route   POST /api/public/dashboard/projects/submit
// @access  Private/Candidate
exports.submitProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { projectId, repoUrl } = req.body;
    const submission = await Submission_1.default.create({
        candidateId: req.user?._id,
        projectId,
        repoUrl,
    });
    // Update candidate's submittedProjects array
    await Candidate_1.default.findByIdAndUpdate(req.user?._id, {
        $push: {
            submittedProjects: {
                projectId,
                repoUrl,
                status: 'pending',
                date: new Date(),
            },
        },
    });
    res.status(201).json({ success: true, data: submission });
});
// @desc    Update student profile
// @route   PUT /api/public/dashboard/profile
// @access  Private/Candidate
exports.updateProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const candidate = await Candidate_1.default.findById(req.user?._id).select('+password');
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }
    const { name, phone, password, avatar } = req.body;
    if (name)
        candidate.name = name;
    if (phone)
        candidate.phone = phone;
    if (password)
        candidate.password = password;
    if (avatar !== undefined)
        candidate.avatar = avatar;
    const updatedCandidate = await candidate.save();
    res.json({
        success: true,
        data: {
            _id: updatedCandidate._id,
            name: updatedCandidate.name,
            email: updatedCandidate.email,
            phone: updatedCandidate.phone,
            avatar: updatedCandidate.avatar || "",
        },
    });
});
