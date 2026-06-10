import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Candidate from '../models/Candidate';
import Course from '../models/Course';
import Certificate from '../models/Certificate';
import Test from '../models/Test';
import Submission from '../models/Submission';

import Setting from '../models/Setting';

// @desc    Get student dashboard data
// @route   GET /api/public/dashboard
// @access  Private/Candidate
export const getDashboardData = asyncHandler(async (req: Request, res: Response) => {
    const candidate = await Candidate.findById(req.user?._id)
        .populate('enrolledCourses')
        .populate('submittedProjects.projectId');

    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const skillSetting = await Setting.findOne({ key: 'skill_categories' });
    let skillCategories = [];
    if (skillSetting && skillSetting.value) {
        try {
            skillCategories = JSON.parse(skillSetting.value);
        } catch (e) {
            skillCategories = skillSetting.value.split(',').map((s: string) => ({
                id: s.trim().toLowerCase().replace(/\s+/g, '_'),
                name: s.trim()
            }));
        }
    } else {
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

    const certificatesCount = await Certificate.countDocuments({ candidateEmail: candidate.email });
    
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
export const getStudentCertificates = asyncHandler(async (req: Request, res: Response) => {
    const certificates = await Certificate.find({ candidateEmail: req.user?.email });
    res.json({ success: true, data: certificates });
});

// @desc    Get available tests for enrolled courses
// @route   GET /api/public/dashboard/tests
// @access  Private/Candidate
export const getStudentTests = asyncHandler(async (req: Request, res: Response) => {
    const candidate = await Candidate.findById(req.user?._id);
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const tests = await Test.find({ courseId: { $in: candidate.enrolledCourses } });
    res.json({ success: true, data: tests });
});

// @desc    Submit a project
// @route   POST /api/public/dashboard/projects/submit
// @access  Private/Candidate
export const submitProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId, repoUrl } = req.body;

    const submission = await Submission.create({
        candidateId: req.user?._id,
        projectId,
        repoUrl,
    });

    // Update candidate's submittedProjects array
    await Candidate.findByIdAndUpdate(req.user?._id, {
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
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const candidate = await Candidate.findById(req.user?._id).select('+password');

    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const { name, phone, password, avatar } = req.body;

    if (name) candidate.name = name;
    if (phone) candidate.phone = phone;
    if (password) candidate.password = password;
    if (avatar !== undefined) candidate.avatar = avatar;

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
