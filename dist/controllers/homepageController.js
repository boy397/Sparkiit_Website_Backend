"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomepageData = exports.clearHomepageCache = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const Service_1 = __importDefault(require("../models/Service"));
const SectionContent_1 = __importDefault(require("../models/SectionContent"));
const Testimonial_1 = __importDefault(require("../models/Testimonial"));
const PageModel_1 = __importDefault(require("../models/PageModel"));
const Blog_1 = __importDefault(require("../models/Blog"));
const Event_1 = __importDefault(require("../models/Event"));
const Mentor_1 = __importDefault(require("../models/Mentor"));
const Brand_1 = __importDefault(require("../models/Brand"));
const Recognition_1 = __importDefault(require("../models/Recognition"));
const SocialLink_1 = __importDefault(require("../models/SocialLink"));
const Faq_1 = __importDefault(require("../models/Faq"));
const FooterSetting_1 = __importDefault(require("../models/FooterSetting"));
const Menu_1 = __importDefault(require("../models/Menu"));
const Setting_1 = __importDefault(require("../models/Setting"));
const HorizontalScrollItem_1 = __importDefault(require("../models/HorizontalScrollItem"));
const Collaborator_1 = __importDefault(require("../models/Collaborator"));
// Simple in-memory cache for homepage data
let homepageCache = null;
let homepageCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
const clearHomepageCache = () => {
    homepageCache = null;
    homepageCacheTime = 0;
};
exports.clearHomepageCache = clearHomepageCache;
// @desc    Get all homepage data
// @route   GET /api/public/homepage
// @access  Public
const getHomepageData = async (req, res) => {
    try {
        if (homepageCache && (Date.now() - homepageCacheTime < CACHE_TTL)) {
            return res.status(200).json(homepageCache);
        }
        const [projects, services, contents, testimonials, homePage, blogs, events, mentors, brands, socialLinks, faqs, recognitions, footerSettings, menus, settings, horizontalScrollDb, collaborators] = await Promise.all([
            Project_1.default.find().sort({ order: 1 }),
            Service_1.default.find().sort({ order: 1 }),
            SectionContent_1.default.find(),
            Testimonial_1.default.find().sort({ order: 1 }),
            PageModel_1.default.findOne({
                $or: [
                    { name: /^home$/i },
                    { slug: 'home' },
                    { slug: '/' }
                ]
            }),
            Blog_1.default.find().sort({ createdAt: -1 }).limit(6),
            Event_1.default.find().sort({ date: 1 }),
            Mentor_1.default.find().sort({ order: 1 }),
            Brand_1.default.find().sort({ order: 1 }),
            SocialLink_1.default.find().sort({ order: 1 }),
            Faq_1.default.find().sort({ order: 1 }),
            Recognition_1.default.find().sort({ order: 1 }),
            FooterSetting_1.default.find(),
            Menu_1.default.find().sort({ order: 1 }),
            Setting_1.default.find({ group: { $in: ['contact_page', 'enrollment', 'footer', 'general'] } }),
            HorizontalScrollItem_1.default.find().sort({ order: 1 }),
            Collaborator_1.default.find().sort({ order: 1 })
        ]);
        const horizontalScrollItems = horizontalScrollDb.map((item, index) => ({
            _id: item._id.toString(),
            title: item.title,
            description: item.description || "",
            category: item.category || "GENERAL",
            image: item.image || "",
            num: item.num || (index + 1).toString().padStart(2, '0'),
            link: item.link || "",
            order: item.order || index
        }));
        // Transform contents array into a nested object
        const contentMap = {};
        contents.forEach(c => {
            if (!contentMap[c.section])
                contentMap[c.section] = {};
            contentMap[c.section][c.key] = c.value;
        });
        // Ensure Branding overrides logic
        if (contentMap.hero) {
            contentMap.hero.tagline = "Not Basic Training. A High Impact Career Engine";
        }
        if (!contentMap.site)
            contentMap.site = {};
        contentMap.site.footerDesc = "A structured pathway designed for driven students to explore opportunities, develop in-demand skills, and turn career goals into real achievements.";
        if (!contentMap.expertise)
            contentMap.expertise = {};
        contentMap.expertise.title = "TURN UNCERTAINTY INTO DIRECTION";
        contentMap.expertise.description = "Unlock a vast library of premium domains spanning diverse fields, all led by world renowned experts. Whether you're looking to elevate your career or master new skills, our platform gives you the knowledge and flexibility you need to thrive";
        if (!contentMap.story)
            contentMap.story = {};
        contentMap.story.subtitle = "Since our inception, we have been empowering learners with industry-focused education across diverse domains, helping them build real-world skills, explore career paths, and stay ahead in an ever-evolving digital world.";
        contentMap.story.description = "Our mission is to empower learners with the knowledge, skills, and guidance they need to shape their future. We believe education should open doors, not create barriers. By combining practical learning with industry expertise, we deliver experiences that are engaging, career-focused, and built for real-world success.";
        if (!contentMap.insights)
            contentMap.insights = {};
        contentMap.insights.description = "Explore fresh insights, industry trends, and expert perspectives through our regularly updated articles and blogs.";
        if (!contentMap.process)
            contentMap.process = {};
        contentMap.process.title = "SPARKIIT CATCHPHRASE";
        contentMap.process.description = "Focusing on Real Results and Practical Outcomes Rather Than Just Theoretical Learning.";
        if (!contentMap.testimonials)
            contentMap.testimonials = {};
        contentMap.testimonials.subtitle = "Mentors Dedicated to Supporting Your Growth";
        if (!contentMap.mentors)
            contentMap.mentors = {};
        contentMap.mentors.subtitle = "Mentors Dedicated to Supporting Your Growth";
        contentMap.process.step1Title = "IDEA";
        contentMap.process.step1Desc = "Spark your ideas with clarity and purpose, building a strong foundation for your learning journey.";
        contentMap.process.step2Title = "INNOVATION";
        contentMap.process.step2Desc = "Transform your ideas into impactful innovation through hands-on training and practical exposure.";
        contentMap.process.step3Title = "TRANSFORMATION";
        contentMap.process.step3Desc = "Transform yourself with real-world experience, industry-relevant skills, and career-focused execution.";
        const defaultPageStructure = [
            { name: 'HeroSection', enabled: true, order: 1 },
            { name: 'Marquee', enabled: true, order: 2 },
            { name: 'HorizontalScroll', enabled: true, order: 3 },
            { name: 'WorkingProcess', enabled: true, order: 4 },
            { name: 'OurStory', enabled: true, order: 5 },
            { name: 'CompanyInsights', enabled: true, order: 6 },
            { name: 'LatestProjects', enabled: true, order: 7 },
            { name: 'FeaturedIn', enabled: true, order: 8 },
            { name: 'MentorsSection', enabled: true, order: 9 },
            { name: 'Testimonials', enabled: true, order: 10 },
            { name: 'FaqSection', enabled: true, order: 11 },
            { name: 'ContactSection', enabled: true, order: 12 }
        ];
        const responseData = {
            success: true,
            data: {
                projects,
                services,
                testimonials,
                blogs,
                events,
                mentors,
                brands,
                collaborators,
                socialLinks,
                faqs,
                recognitions,
                footerSettings,
                menus,
                content: contentMap,
                settings: settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {}),
                pageStructure: (homePage?.sections && homePage.sections.length > 0) ? homePage.sections : defaultPageStructure,
                horizontalScrollItems
            }
        };
        homepageCache = responseData;
        homepageCacheTime = Date.now();
        res.status(200).json(responseData);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
exports.getHomepageData = getHomepageData;
// Admin handlers could be added here later for managing these sections
