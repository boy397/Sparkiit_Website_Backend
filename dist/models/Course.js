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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'Price cannot be negative'],
    },
    duration: {
        type: String,
        required: [true, 'Course duration is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'draft', 'archived'],
        default: 'draft',
    },
    batchStatus: {
        type: String,
        enum: ['ongoing', 'upcoming', 'past', 'self-paced'],
        default: 'ongoing',
    },
    imageUrl: {
        type: String,
        default: '',
    },
    paymentLink: {
        type: String,
        default: '',
    },
    links: [
        {
            type: String,
            trim: true,
        },
    ],
    instructorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'all'],
        default: 'all',
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    isApproved: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'approved',
    },
    isPopular: {
        type: Boolean,
        default: false,
    },
    showHomepage: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Course', CourseSchema);
