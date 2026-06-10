import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Project from '../models/Project';
import Service from '../models/Service';
import SectionContent from '../models/SectionContent';
import Testimonial from '../models/Testimonial';
import PageModel from '../models/PageModel';
import Blog from '../models/Blog';
import Event from '../models/Event';
import Mentor from '../models/Mentor';
import Brand from '../models/Brand';
import Recognition from '../models/Recognition';
import SocialLink from '../models/SocialLink';
import Faq from '../models/Faq';
import FooterSetting from '../models/FooterSetting';
import Menu from '../models/Menu';
import Setting from '../models/Setting';
import HorizontalScrollItem from '../models/HorizontalScrollItem';
import Collaborator from '../models/Collaborator';

// @desc    Get all homepage data
// @route   GET /api/public/homepage
// @access  Public
export const getHomepageData = async (req: ExpressRequest, res: ExpressResponse) => {
    try {
        const [
            projects, 
            services, 
            contents, 
            testimonials, 
            homePage,
            blogs,
            events,
            mentors,
            brands,
            socialLinks,
            faqs,
            recognitions,
            footerSettings,
            menus,
            settings,
            horizontalScrollDb,
            collaborators
        ] = await Promise.all([
            Project.find().sort({ order: 1 }),
            Service.find().sort({ order: 1 }),
            SectionContent.find(),
            Testimonial.find().sort({ order: 1 }),
            PageModel.findOne({ 
                $or: [
                    { name: /^home$/i },
                    { slug: 'home' },
                    { slug: '/' }
                ]
            }),
            Blog.find().sort({ createdAt: -1 }).limit(6),
            Event.find().sort({ date: 1 }),
            Mentor.find().sort({ order: 1 }),
            Brand.find().sort({ order: 1 }),
            SocialLink.find().sort({ order: 1 }),
            Faq.find().sort({ order: 1 }),
            Recognition.find().sort({ order: 1 }),
            FooterSetting.find(),
            Menu.find().sort({ order: 1 }),
            Setting.find({ group: { $in: ['contact_page', 'enrollment', 'footer', 'general'] } }),
            HorizontalScrollItem.find().sort({ order: 1 }),
            Collaborator.find().sort({ order: 1 })
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
        const contentMap: any = {};
        contents.forEach(c => {
            if (!contentMap[c.section]) contentMap[c.section] = {};
            contentMap[c.section][c.key] = c.value;
        });

        // Ensure Branding overrides logic
        if (contentMap.hero) {
            contentMap.hero.tagline = "Not Basic Training. A High Impact Career Engine";
        }
        
        if (!contentMap.site) contentMap.site = {};
        contentMap.site.footerDesc = "A structured pathway designed for driven students to explore opportunities, develop in-demand skills, and turn career goals into real achievements.";
        
        if (!contentMap.expertise) contentMap.expertise = {};
        contentMap.expertise.title = "TURN UNCERTAINTY INTO DIRECTION";
        contentMap.expertise.description = "Unlock a vast library of premium domains spanning diverse fields, all led by world renowned experts. Whether you're looking to elevate your career or master new skills, our platform gives you the knowledge and flexibility you need to thrive";
        
        if (!contentMap.story) contentMap.story = {};
        contentMap.story.subtitle = "Since our inception, we have been empowering learners with industry-focused education across diverse domains, helping them build real-world skills, explore career paths, and stay ahead in an ever-evolving digital world.";
        contentMap.story.description = "Our mission is to empower learners with the knowledge, skills, and guidance they need to shape their future. We believe education should open doors, not create barriers. By combining practical learning with industry expertise, we deliver experiences that are engaging, career-focused, and built for real-world success.";
        
        if (!contentMap.insights) contentMap.insights = {};
        contentMap.insights.description = "Explore fresh insights, industry trends, and expert perspectives through our regularly updated articles and blogs.";
        
        if (!contentMap.process) contentMap.process = {};
        contentMap.process.title = "SPARKIIT CATCHPHRASE";
        contentMap.process.description = "Focusing on Real Results and Practical Outcomes Rather Than Just Theoretical Learning.";
        
        if (!contentMap.testimonials) contentMap.testimonials = {};
        contentMap.testimonials.subtitle = "Mentors Dedicated to Supporting Your Growth";

        if (!contentMap.mentors) contentMap.mentors = {};
        contentMap.mentors.subtitle = "Mentors Dedicated to Supporting Your Growth";

        contentMap.process.step1Title = "IDEA";
        contentMap.process.step1Desc = "Spark your ideas with clarity and purpose, building a strong foundation for your learning journey.";
        contentMap.process.step2Title = "INNOVATION";
        contentMap.process.step2Desc = "Transform your ideas into impactful innovation through hands-on training and practical exposure.";
        contentMap.process.step3Title = "TRANSFORMATION";
        contentMap.process.step3Desc = "Transform yourself with real-world experience, industry-relevant skills, and career-focused execution.";

        res.status(200).json({
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
                settings: settings.reduce((acc: any, s: any) => ({ ...acc, [s.key]: s.value }), {}),
                pageStructure: homePage?.sections || [],
                horizontalScrollItems
            }
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Admin handlers could be added here later for managing these sections
