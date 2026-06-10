import { Router } from 'express';
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/courseController';
import {
    getAllCandidates,
    getCandidateById,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    assignCourse,
    removeCourse,
    getDashboardStats,
} from '../controllers/candidateController';
import {
    getAllUsers,
    deleteUser,
    updateUserRole,
} from '../controllers/userController';
import { login, register, logout, getMe } from '../controllers/authController';
import {
    getAllCertificates,
    createCertificate,
    bulkCreateCertificates,
    deleteCertificate,
} from '../controllers/certificateController';
import {
    getAllTemplates,
    createTemplate,
    deleteTemplate,
    uploadTemplatePDF,
} from '../controllers/templateController';
import { upload, uploadImage } from '../middleware/uploadMiddleware';
import {
    getAllContent,
    updateContentBatch,
    updateSingleContent,
} from '../controllers/contentController';
import {
    getAllProjectsAdmin,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/projectController';
import {
    getAllServicesAdmin,
    createService,
    updateService,
    deleteService,
} from '../controllers/serviceController';
import {
    getAllHorizontalScrollItemsAdmin,
    createHorizontalScrollItem,
    updateHorizontalScrollItem,
    deleteHorizontalScrollItem,
} from '../controllers/horizontalScrollController';
import { protect, authorize } from '../middleware/authMiddleware';

// --- DOMAIN IMPORTS ---
import { getAllBadges, createBadge, updateBadge, deleteBadge } from '../controllers/badgeController';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { getAllOrders, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import { getAllCoupons, createCoupon, updateCoupon, deleteCoupon } from '../controllers/couponController';
import { getAllWithdrawals, createWithdrawal, updateWithdrawal, deleteWithdrawal } from '../controllers/withdrawalController';
import { getAllLocations, createLocation, updateLocation, deleteLocation } from '../controllers/locationController';
import { getAllBrands, createBrand, updateBrand, deleteBrand } from '../controllers/brandController';
import { getAllFooterSettings, createFooterSetting, updateFooterSetting, deleteFooterSetting } from '../controllers/footerSettingController';
import { getAllMenus, createMenu, updateMenu, deleteMenu } from '../controllers/menuController';
import { getAllPageModels, createPageModel, updatePageModel, deletePageModel, getPageBySlug } from '../controllers/pageModelController';
import { getAllSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../controllers/socialLinkController';
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faqController';
import { getAllRecognitions, createRecognition, updateRecognition, deleteRecognition } from '../controllers/recognitionController';
import { getAllSettings, updateSettingsBulk, upsertSetting, createSetting, updateSetting, deleteSetting } from '../controllers/settingController';

import { getAllBookings, updateBookingStatus, deleteBooking } from '../controllers/bookingController';
import { getAllTestimonialsAdmin, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController';
import { getAllMentors, createMentor, updateMentor, deleteMentor } from '../controllers/mentorController';
import { getAllEventsAdmin, createEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import { logAttendance, getAllAttendance, deleteAttendance, getTeamAttendance } from '../controllers/attendanceController';

// --- CURRICULUM IMPORTS ---
import { getChaptersByCourse, createChapter, updateChapter, deleteChapter } from '../controllers/chapterController';
import { getLessonsByChapter, createLesson, updateLesson, deleteLesson } from '../controllers/lessonController';

// --- PERFORMANCE IMPORTS ---
import { getMyTeam, setTarget, getPerformanceStats, getAllUsersForTeam, deleteTarget, getTeamPerformanceSummary, assignMembers } from '../controllers/performanceController';



const router = Router();

// Authentication
router.post('/login', login);
router.post('/register', protect, authorize('SUPER_ADMIN', 'ADMIN'), register);
router.get('/logout', logout);
router.get('/me', protect, getMe);

// User Management
router.get('/users', protect, authorize('SUPER_ADMIN', 'ADMIN'), getAllUsers);
router.put('/users/:id/role', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateUserRole);
router.delete('/users/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteUser);

// Dashboard stats
router.get('/stats', protect, getDashboardStats);

// Course routes
router.get('/courses', protect, getAllCourses);
router.get('/courses/:id', protect, getCourseById);
router.post('/courses', protect, authorize('SUPER_ADMIN'), createCourse);
router.put('/courses/:id', protect, authorize('SUPER_ADMIN'), updateCourse);
router.delete('/courses/:id', protect, authorize('SUPER_ADMIN'), deleteCourse);

// Curriculum: Chapters
router.get('/chapters', protect, authorize('SUPER_ADMIN', 'ADMIN'), getChaptersByCourse);
router.post('/chapters', protect, authorize('SUPER_ADMIN'), createChapter);
router.put('/chapters/:id', protect, authorize('SUPER_ADMIN'), updateChapter);
router.delete('/chapters/:id', protect, authorize('SUPER_ADMIN'), deleteChapter);

// Curriculum: Lessons
router.get('/lessons', protect, authorize('SUPER_ADMIN', 'ADMIN'), getLessonsByChapter);
router.post('/lessons', protect, authorize('SUPER_ADMIN'), createLesson);
router.put('/lessons/:id', protect, authorize('SUPER_ADMIN'), updateLesson);
router.delete('/lessons/:id', protect, authorize('SUPER_ADMIN'), deleteLesson);

// Other Domain Routes
router.get('/candidates', protect, authorize('SUPER_ADMIN', 'ADMIN'), getAllCandidates);
router.get('/candidates/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), getCandidateById);
router.post('/candidates', protect, authorize('SUPER_ADMIN', 'ADMIN'), createCandidate);
router.put('/candidates/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), updateCandidate);
router.delete('/candidates/:id', protect, authorize('SUPER_ADMIN', 'ADMIN'), deleteCandidate);
router.post('/candidates/:id/assign-course', protect, authorize('SUPER_ADMIN', 'ADMIN'), assignCourse);
router.post('/candidates/:id/remove-course', protect, authorize('SUPER_ADMIN', 'ADMIN'), removeCourse);

router.get('/certificates', protect, getAllCertificates);
router.post('/certificates', protect, authorize('SUPER_ADMIN'), createCertificate);
router.post('/certificates/bulk', protect, authorize('SUPER_ADMIN'), bulkCreateCertificates);
router.delete('/certificates/:id', protect, authorize('SUPER_ADMIN'), deleteCertificate);

// Certificate Templates
router.get('/certificate-templates', protect, authorize('SUPER_ADMIN'), getAllTemplates);
router.post('/certificate-templates', protect, authorize('SUPER_ADMIN'), createTemplate);
router.delete('/certificate-templates/:id', protect, authorize('SUPER_ADMIN'), deleteTemplate);
router.post('/certificate-templates/upload', protect, authorize('SUPER_ADMIN'), upload.single('pdf'), uploadTemplatePDF);
router.post('/upload-image', protect, authorize('SUPER_ADMIN', 'ADMIN'), uploadImage.single('image'), (req, res) => {
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
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/upload-pdf', protect, authorize('SUPER_ADMIN', 'ADMIN'), upload.single('pdf'), (req, res) => {
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
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get('/content', protect, getAllContent);
router.put('/content/batch', protect, authorize('SUPER_ADMIN'), updateContentBatch);
router.post('/content', protect, authorize('SUPER_ADMIN'), updateSingleContent);

router.get('/projects', protect, getAllProjectsAdmin);
router.post('/projects', protect, authorize('SUPER_ADMIN'), createProject);
router.put('/projects/:id', protect, authorize('SUPER_ADMIN'), updateProject);
router.delete('/projects/:id', protect, authorize('SUPER_ADMIN'), deleteProject);

router.get('/services', protect, getAllServicesAdmin);
router.post('/services', protect, authorize('SUPER_ADMIN'), createService);
router.put('/services/:id', protect, authorize('SUPER_ADMIN'), updateService);
router.delete('/services/:id', protect, authorize('SUPER_ADMIN'), deleteService);

router.get('/horizontal-scroll', protect, getAllHorizontalScrollItemsAdmin);
router.post('/horizontal-scroll', protect, authorize('SUPER_ADMIN'), createHorizontalScrollItem);
router.put('/horizontal-scroll/:id', protect, authorize('SUPER_ADMIN'), updateHorizontalScrollItem);
router.delete('/horizontal-scroll/:id', protect, authorize('SUPER_ADMIN'), deleteHorizontalScrollItem);

router.get('/badges', protect, getAllBadges);
router.post('/badges', protect, authorize('SUPER_ADMIN'), createBadge);
router.put('/badges/:id', protect, authorize('SUPER_ADMIN'), updateBadge);
router.delete('/badges/:id', protect, authorize('SUPER_ADMIN'), deleteBadge);

router.get('/blogs', protect, getAllBlogs);
router.post('/blogs', protect, authorize('SUPER_ADMIN'), createBlog);
router.put('/blogs/:id', protect, authorize('SUPER_ADMIN'), updateBlog);
router.delete('/blogs/:id', protect, authorize('SUPER_ADMIN'), deleteBlog);

router.get('/orders', protect, getAllOrders);
router.post('/orders', protect, authorize('SUPER_ADMIN'), createOrder);
router.put('/orders/:id', protect, authorize('SUPER_ADMIN'), updateOrder);
router.delete('/orders/:id', protect, authorize('SUPER_ADMIN'), deleteOrder);

router.get('/coupons', protect, getAllCoupons);
router.post('/coupons', protect, authorize('SUPER_ADMIN'), createCoupon);
router.put('/coupons/:id', protect, authorize('SUPER_ADMIN'), updateCoupon);
router.delete('/coupons/:id', protect, authorize('SUPER_ADMIN'), deleteCoupon);

router.get('/withdrawals', protect, getAllWithdrawals);
router.post('/withdrawals', protect, authorize('SUPER_ADMIN'), createWithdrawal);
router.put('/withdrawals/:id', protect, authorize('SUPER_ADMIN'), updateWithdrawal);
router.delete('/withdrawals/:id', protect, authorize('SUPER_ADMIN'), deleteWithdrawal);

router.get('/locations', protect, getAllLocations);
router.post('/locations', protect, authorize('SUPER_ADMIN'), createLocation);
router.put('/locations/:id', protect, authorize('SUPER_ADMIN'), updateLocation);
router.delete('/locations/:id', protect, authorize('SUPER_ADMIN'), deleteLocation);

router.get('/brands', protect, getAllBrands);
router.post('/brands', protect, authorize('SUPER_ADMIN'), createBrand);
router.put('/brands/:id', protect, authorize('SUPER_ADMIN'), updateBrand);
router.delete('/brands/:id', protect, authorize('SUPER_ADMIN'), deleteBrand);

router.get('/footer-settings', protect, getAllFooterSettings);
router.post('/footer-settings', protect, authorize('SUPER_ADMIN'), createFooterSetting);
router.put('/footer-settings/:id', protect, authorize('SUPER_ADMIN'), updateFooterSetting);
router.delete('/footer-settings/:id', protect, authorize('SUPER_ADMIN'), deleteFooterSetting);

router.get('/menus', protect, getAllMenus);
router.post('/menus', protect, authorize('SUPER_ADMIN'), createMenu);
router.put('/menus/:id', protect, authorize('SUPER_ADMIN'), updateMenu);
router.delete('/menus/:id', protect, authorize('SUPER_ADMIN'), deleteMenu);

router.get('/pages', protect, getAllPageModels);
router.get('/pages/slug/:slug', getPageBySlug);
router.post('/pages', protect, authorize('SUPER_ADMIN'), createPageModel);
router.put('/pages/:id', protect, authorize('SUPER_ADMIN'), updatePageModel);
router.delete('/pages/:id', protect, authorize('SUPER_ADMIN'), deletePageModel);

router.get('/social-links', protect, getAllSocialLinks);
router.post('/social-links', protect, authorize('SUPER_ADMIN'), createSocialLink);
router.put('/social-links/:id', protect, authorize('SUPER_ADMIN'), updateSocialLink);
router.delete('/social-links/:id', protect, authorize('SUPER_ADMIN'), deleteSocialLink);

router.get('/faqs', protect, getAllFaqs);
router.post('/faqs', protect, authorize('SUPER_ADMIN'), createFaq);
router.put('/faqs/:id', protect, authorize('SUPER_ADMIN'), updateFaq);
router.delete('/faqs/:id', protect, authorize('SUPER_ADMIN'), deleteFaq);

router.get('/recognitions', protect, getAllRecognitions);
router.post('/recognitions', protect, authorize('SUPER_ADMIN'), createRecognition);
router.put('/recognitions/:id', protect, authorize('SUPER_ADMIN'), updateRecognition);
router.delete('/recognitions/:id', protect, authorize('SUPER_ADMIN'), deleteRecognition);

router.get('/settings', protect, getAllSettings);
router.put('/settings/bulk', protect, authorize('SUPER_ADMIN'), updateSettingsBulk);
router.post('/settings-upsert', protect, authorize('SUPER_ADMIN'), upsertSetting);

router.post('/settings', protect, authorize('SUPER_ADMIN'), createSetting);
router.put('/settings/:id', protect, authorize('SUPER_ADMIN'), updateSetting);
router.delete('/settings/:id', protect, authorize('SUPER_ADMIN'), deleteSetting);

router.get('/bookings', protect, getAllBookings);
router.put('/bookings/:id', protect, authorize('SUPER_ADMIN'), updateBookingStatus);
router.delete('/bookings/:id', protect, authorize('SUPER_ADMIN'), deleteBooking);

router.get('/testimonials', protect, getAllTestimonialsAdmin);
router.post('/testimonials', protect, authorize('SUPER_ADMIN'), createTestimonial);
router.put('/testimonials/:id', protect, authorize('SUPER_ADMIN'), updateTestimonial);
router.delete('/testimonials/:id', protect, authorize('SUPER_ADMIN'), deleteTestimonial);

router.get('/mentors', protect, getAllMentors);
router.post('/mentors', protect, authorize('SUPER_ADMIN'), createMentor);
router.put('/mentors/:id', protect, authorize('SUPER_ADMIN'), updateMentor);
router.delete('/mentors/:id', protect, authorize('SUPER_ADMIN'), deleteMentor);

router.get('/events', protect, getAllEventsAdmin);
router.post('/events', protect, authorize('SUPER_ADMIN'), createEvent);
router.put('/events/:id', protect, authorize('SUPER_ADMIN'), updateEvent);
router.delete('/events/:id', protect, authorize('SUPER_ADMIN'), deleteEvent);

router.get('/attendance', protect, authorize('SUPER_ADMIN'), getAllAttendance);
router.post('/attendance', protect, logAttendance);
router.delete('/attendance/:id', protect, authorize('SUPER_ADMIN'), deleteAttendance);

// Employee Performance Routes
router.get('/employees/all-users', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), getAllUsersForTeam);
router.get('/employees/team', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), getMyTeam);
router.get('/employees/team-summary', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), getTeamPerformanceSummary);
router.get('/employees/team-attendance', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), getTeamAttendance);
router.post('/employees/target', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), setTarget);
router.post('/employees/assign', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), assignMembers);
router.delete('/employees/target/:id', protect, authorize('SUPER_ADMIN', 'ADMIN', 'TEAM_LEADER', 'MANAGER'), deleteTarget);
router.get('/employees/performance/:userId', protect, getPerformanceStats);




export default router;
