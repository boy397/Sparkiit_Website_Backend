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
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CandidateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Candidate name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 4,
        select: false,
    },
    phone: {
        type: String,
        default: '',
        trim: true,
    },
    enrolledCourses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
    paymentDetails: {
        paidAmount: { type: Number, default: 0 },
        remainingAmount: { type: Number, default: 0 },
    },
    performanceMetrics: {
        overallScore: { type: Number, default: 0 },
        attendance: { type: Number, default: 0 },
        progress: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
    },
    batchRank: { type: String, default: 'N/A' },
    stipendEligible: { type: Boolean, default: false },
    skills: {
        type: Map,
        of: Number,
        default: {}
    },
    completedTests: [
        {
            testId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Test' },
            score: Number,
            date: { type: Date, default: Date.now }
        }
    ],
    submittedProjects: [
        {
            projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project' },
            repoUrl: String,
            status: { type: String, enum: ['pending', 'reviewed', 'rejected'], default: 'pending' },
            feedback: String,
            grade: String,
            date: { type: Date, default: Date.now }
        }
    ],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    avatar: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});
// Hash password before saving
CandidateSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    if (!this.password)
        return;
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
// Compare password method
CandidateSchema.methods.comparePassword = async function (password) {
    if (!this.password)
        return false;
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.default = mongoose_1.default.models.Candidate || mongoose_1.default.model('Candidate', CandidateSchema);
