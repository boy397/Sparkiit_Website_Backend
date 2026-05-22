"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homepageController_1 = require("../controllers/homepageController");
const certificateController_1 = require("../controllers/certificateController");
const courseController_1 = require("../controllers/courseController");
const candidateAuthController_1 = require("../controllers/candidateAuthController");
const paymentController_1 = require("../controllers/paymentController");
const bookingController_1 = require("../controllers/bookingController");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const testimonialController_1 = require("../controllers/testimonialController");
const blogController_1 = require("../controllers/blogController");
const mentorController_1 = require("../controllers/mentorController");
const eventController_1 = require("../controllers/eventController");
const faqController_1 = require("../controllers/faqController");
const pageModelController_1 = require("../controllers/pageModelController");
const router = express_1.default.Router();
router.get('/homepage', homepageController_1.getHomepageData);
router.get('/validate-certificate', certificateController_1.validateCertificate);
router.get('/courses', courseController_1.getAllCourses);
router.get('/testimonials', testimonialController_1.getAllTestimonialsPublic);
router.get('/blogs', blogController_1.getAllBlogs);
router.get('/mentors', mentorController_1.getPublicMentors);
router.get('/events', eventController_1.getAllEventsPublic);
router.get('/faqs', faqController_1.getAllFaqs);
router.get('/pages', pageModelController_1.getAllPageModels);
router.get('/pages/:slug', pageModelController_1.getPageBySlug);
// Candidate Authentication
router.post('/auth/signup', candidateAuthController_1.signup);
router.post('/auth/login', candidateAuthController_1.login);
router.get('/auth/me', authMiddleware_1.protect, candidateAuthController_1.getMe);
// Payments
router.post('/payments/create-order', authMiddleware_1.protect, paymentController_1.createOrder);
router.post('/payments/verify', authMiddleware_1.protect, paymentController_1.verifyPayment);
// Bookings
router.post('/bookings', authMiddleware_1.protect, bookingController_1.createBooking);
router.get('/bookings/my', authMiddleware_1.protect, bookingController_1.getMyBookings);
// Dashboard
router.get('/dashboard', authMiddleware_1.protect, dashboardController_1.getDashboardData);
router.get('/dashboard/certificates', authMiddleware_1.protect, dashboardController_1.getStudentCertificates);
router.get('/dashboard/tests', authMiddleware_1.protect, dashboardController_1.getStudentTests);
router.post('/dashboard/projects/submit', authMiddleware_1.protect, dashboardController_1.submitProject);
router.put('/dashboard/profile', authMiddleware_1.protect, dashboardController_1.updateProfile);
exports.default = router;
