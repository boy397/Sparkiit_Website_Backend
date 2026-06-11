"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
const candidateController_1 = require("../controllers/candidateController");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const certificateController_1 = require("../controllers/certificateController");
const templateController_1 = require("../controllers/templateController");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const contentController_1 = require("../controllers/contentController");
const projectController_1 = require("../controllers/projectController");
const serviceController_1 = require("../controllers/serviceController");
const horizontalScrollController_1 = require("../controllers/horizontalScrollController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// --- DOMAIN IMPORTS ---
const badgeController_1 = require("../controllers/badgeController");
const blogController_1 = require("../controllers/blogController");
const orderController_1 = require("../controllers/orderController");
const couponController_1 = require("../controllers/couponController");
const withdrawalController_1 = require("../controllers/withdrawalController");
const locationController_1 = require("../controllers/locationController");
const brandController_1 = require("../controllers/brandController");
const collaboratorController_1 = require("../controllers/collaboratorController");
const footerSettingController_1 = require("../controllers/footerSettingController");
const menuController_1 = require("../controllers/menuController");
const pageModelController_1 = require("../controllers/pageModelController");
const socialLinkController_1 = require("../controllers/socialLinkController");
const faqController_1 = require("../controllers/faqController");
const recognitionController_1 = require("../controllers/recognitionController");
const settingController_1 = require("../controllers/settingController");
const bookingController_1 = require("../controllers/bookingController");
const testimonialController_1 = require("../controllers/testimonialController");
const mentorController_1 = require("../controllers/mentorController");
const eventController_1 = require("../controllers/eventController");
const attendanceController_1 = require("../controllers/attendanceController");
// --- CURRICULUM IMPORTS ---
const chapterController_1 = require("../controllers/chapterController");
const lessonController_1 = require("../controllers/lessonController");
// --- PERFORMANCE IMPORTS ---
const performanceController_1 = require("../controllers/performanceController");
const router = (0, express_1.Router)();
// Authentication
router.post('/login', authController_1.login);
router.post('/register', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), authController_1.register);
router.get('/logout', authController_1.logout);
router.get('/me', authMiddleware_1.protect, authController_1.getMe);
// User Management
router.get('/users', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), userController_1.getAllUsers);
router.put('/users/:id/role', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), userController_1.updateUserRole);
router.delete('/users/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), userController_1.deleteUser);
// Dashboard stats
router.get('/stats', authMiddleware_1.protect, candidateController_1.getDashboardStats);
// Course routes
router.get('/courses', authMiddleware_1.protect, courseController_1.getAllCourses);
router.get('/courses/:id', authMiddleware_1.protect, courseController_1.getCourseById);
router.post('/courses', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), courseController_1.createCourse);
router.put('/courses/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), courseController_1.updateCourse);
router.delete('/courses/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), courseController_1.deleteCourse);
// Curriculum: Chapters
router.get('/chapters', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), chapterController_1.getChaptersByCourse);
router.post('/chapters', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), chapterController_1.createChapter);
router.put('/chapters/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), chapterController_1.updateChapter);
router.delete('/chapters/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), chapterController_1.deleteChapter);
// Curriculum: Lessons
router.get('/lessons', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), lessonController_1.getLessonsByChapter);
router.post('/lessons', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), lessonController_1.createLesson);
router.put('/lessons/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), lessonController_1.updateLesson);
router.delete('/lessons/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), lessonController_1.deleteLesson);
// Other Domain Routes
router.get('/candidates', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.getAllCandidates);
router.get('/candidates/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.getCandidateById);
router.post('/candidates', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.createCandidate);
router.put('/candidates/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.updateCandidate);
router.delete('/candidates/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.deleteCandidate);
router.post('/candidates/:id/assign-course', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.assignCourse);
router.post('/candidates/:id/remove-course', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), candidateController_1.removeCourse);
router.get('/certificates', authMiddleware_1.protect, certificateController_1.getAllCertificates);
router.post('/certificates', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), certificateController_1.createCertificate);
router.post('/certificates/bulk', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), certificateController_1.bulkCreateCertificates);
router.delete('/certificates/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), certificateController_1.deleteCertificate);
// Certificate Templates
router.get('/certificate-templates', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), templateController_1.getAllTemplates);
router.post('/certificate-templates', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), templateController_1.createTemplate);
router.delete('/certificate-templates/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), templateController_1.deleteTemplate);
router.post('/certificate-templates/upload', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), uploadMiddleware_1.upload.single('pdf'), templateController_1.uploadTemplatePDF);
router.post('/upload-image', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), uploadMiddleware_1.uploadImage.single('image'), (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: 'No file uploaded' });
            return;
        }
        const uploadType = req.body.uploadType || 'misc';
        const fileUrl = `/uploads/${uploadType}/${req.file.filename}`;
        res.json({
            success: true,
            data: {
                url: fileUrl,
                filename: req.file.filename
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post('/upload-pdf', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN'), uploadMiddleware_1.upload.single('pdf'), (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ success: false, message: 'No file uploaded' });
            return;
        }
        const uploadType = req.body.uploadType || 'documents';
        const fileUrl = `/uploads/${uploadType}/${req.file.filename}`;
        res.json({
            success: true,
            data: {
                url: fileUrl,
                filename: req.file.filename
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/content', authMiddleware_1.protect, contentController_1.getAllContent);
router.put('/content/batch', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), contentController_1.updateContentBatch);
router.post('/content', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), contentController_1.updateSingleContent);
router.get('/projects', authMiddleware_1.protect, projectController_1.getAllProjectsAdmin);
router.post('/projects', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), projectController_1.createProject);
router.put('/projects/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), projectController_1.updateProject);
router.delete('/projects/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), projectController_1.deleteProject);
router.get('/services', authMiddleware_1.protect, serviceController_1.getAllServicesAdmin);
router.post('/services', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), serviceController_1.createService);
router.put('/services/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), serviceController_1.updateService);
router.delete('/services/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), serviceController_1.deleteService);
router.get('/horizontal-scroll', authMiddleware_1.protect, horizontalScrollController_1.getAllHorizontalScrollItemsAdmin);
router.post('/horizontal-scroll', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), horizontalScrollController_1.createHorizontalScrollItem);
router.put('/horizontal-scroll/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), horizontalScrollController_1.updateHorizontalScrollItem);
router.delete('/horizontal-scroll/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), horizontalScrollController_1.deleteHorizontalScrollItem);
router.get('/badges', authMiddleware_1.protect, badgeController_1.getAllBadges);
router.post('/badges', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), badgeController_1.createBadge);
router.put('/badges/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), badgeController_1.updateBadge);
router.delete('/badges/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), badgeController_1.deleteBadge);
router.get('/blogs', authMiddleware_1.protect, blogController_1.getAllBlogs);
router.post('/blogs', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), blogController_1.createBlog);
router.put('/blogs/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), blogController_1.updateBlog);
router.delete('/blogs/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), blogController_1.deleteBlog);
router.get('/orders', authMiddleware_1.protect, orderController_1.getAllOrders);
router.post('/orders', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), orderController_1.createOrder);
router.put('/orders/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), orderController_1.updateOrder);
router.delete('/orders/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), orderController_1.deleteOrder);
router.get('/coupons', authMiddleware_1.protect, couponController_1.getAllCoupons);
router.post('/coupons', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), couponController_1.createCoupon);
router.put('/coupons/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), couponController_1.updateCoupon);
router.delete('/coupons/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), couponController_1.deleteCoupon);
router.get('/withdrawals', authMiddleware_1.protect, withdrawalController_1.getAllWithdrawals);
router.post('/withdrawals', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), withdrawalController_1.createWithdrawal);
router.put('/withdrawals/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), withdrawalController_1.updateWithdrawal);
router.delete('/withdrawals/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), withdrawalController_1.deleteWithdrawal);
router.get('/locations', authMiddleware_1.protect, locationController_1.getAllLocations);
router.post('/locations', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), locationController_1.createLocation);
router.put('/locations/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), locationController_1.updateLocation);
router.delete('/locations/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), locationController_1.deleteLocation);
router.get('/brands', authMiddleware_1.protect, brandController_1.getAllBrands);
router.post('/brands', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), brandController_1.createBrand);
router.put('/brands/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), brandController_1.updateBrand);
router.delete('/brands/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), brandController_1.deleteBrand);
router.get('/collaborators', authMiddleware_1.protect, collaboratorController_1.getAllCollaborators);
router.post('/collaborators', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), collaboratorController_1.createCollaborator);
router.put('/collaborators/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), collaboratorController_1.updateCollaborator);
router.delete('/collaborators/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), collaboratorController_1.deleteCollaborator);
router.get('/footer-settings', authMiddleware_1.protect, footerSettingController_1.getAllFooterSettings);
router.post('/footer-settings', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), footerSettingController_1.createFooterSetting);
router.put('/footer-settings/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), footerSettingController_1.updateFooterSetting);
router.delete('/footer-settings/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), footerSettingController_1.deleteFooterSetting);
router.get('/menus', authMiddleware_1.protect, menuController_1.getAllMenus);
router.post('/menus', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), menuController_1.createMenu);
router.put('/menus/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), menuController_1.updateMenu);
router.delete('/menus/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), menuController_1.deleteMenu);
router.get('/pages', authMiddleware_1.protect, pageModelController_1.getAllPageModels);
router.get('/pages/slug/:slug', pageModelController_1.getPageBySlug);
router.post('/pages', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), pageModelController_1.createPageModel);
router.put('/pages/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), pageModelController_1.updatePageModel);
router.delete('/pages/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), pageModelController_1.deletePageModel);
router.get('/social-links', authMiddleware_1.protect, socialLinkController_1.getAllSocialLinks);
router.post('/social-links', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), socialLinkController_1.createSocialLink);
router.put('/social-links/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), socialLinkController_1.updateSocialLink);
router.delete('/social-links/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), socialLinkController_1.deleteSocialLink);
router.get('/faqs', authMiddleware_1.protect, faqController_1.getAllFaqs);
router.post('/faqs', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), faqController_1.createFaq);
router.put('/faqs/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), faqController_1.updateFaq);
router.delete('/faqs/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), faqController_1.deleteFaq);
router.get('/recognitions', authMiddleware_1.protect, recognitionController_1.getAllRecognitions);
router.post('/recognitions', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), recognitionController_1.createRecognition);
router.put('/recognitions/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), recognitionController_1.updateRecognition);
router.delete('/recognitions/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), recognitionController_1.deleteRecognition);
router.get('/settings', authMiddleware_1.protect, settingController_1.getAllSettings);
router.put('/settings/bulk', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), settingController_1.updateSettingsBulk);
router.post('/settings-upsert', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), settingController_1.upsertSetting);
router.post('/settings', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), settingController_1.createSetting);
router.put('/settings/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), settingController_1.updateSetting);
router.delete('/settings/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), settingController_1.deleteSetting);
router.get('/bookings', authMiddleware_1.protect, bookingController_1.getAllBookings);
router.put('/bookings/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), bookingController_1.updateBookingStatus);
router.delete('/bookings/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), bookingController_1.deleteBooking);
router.get('/testimonials', authMiddleware_1.protect, testimonialController_1.getAllTestimonialsAdmin);
router.post('/testimonials', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), testimonialController_1.createTestimonial);
router.put('/testimonials/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), testimonialController_1.updateTestimonial);
router.delete('/testimonials/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), testimonialController_1.deleteTestimonial);
router.get('/mentors', authMiddleware_1.protect, mentorController_1.getAllMentors);
router.post('/mentors', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), mentorController_1.createMentor);
router.put('/mentors/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), mentorController_1.updateMentor);
router.delete('/mentors/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), mentorController_1.deleteMentor);
router.get('/events', authMiddleware_1.protect, eventController_1.getAllEventsAdmin);
router.post('/events', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), eventController_1.createEvent);
router.put('/events/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), eventController_1.updateEvent);
router.delete('/events/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), eventController_1.deleteEvent);
router.get('/attendance', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), attendanceController_1.getAllAttendance);
router.post('/attendance', authMiddleware_1.protect, attendanceController_1.logAttendance);
router.delete('/attendance/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN'), attendanceController_1.deleteAttendance);
// Employee Performance Routes
router.get('/employees/all-users', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), performanceController_1.getAllUsersForTeam);
router.get('/employees/team', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), performanceController_1.getMyTeam);
router.get('/employees/team-summary', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), performanceController_1.getTeamPerformanceSummary);
router.get('/employees/team-attendance', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), attendanceController_1.getTeamAttendance);
router.post('/employees/target', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), performanceController_1.setTarget);
router.post('/employees/assign', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), performanceController_1.assignMembers);
router.delete('/employees/target/:id', authMiddleware_1.protect, (0, authMiddleware_1.authorize)('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), performanceController_1.deleteTarget);
router.get('/employees/performance/:userId', authMiddleware_1.protect, performanceController_1.getPerformanceStats);
exports.default = router;
