"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const api_1 = __importDefault(require("./routes/api"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const path_1 = __importDefault(require("path"));
const homepageController_1 = require("./controllers/homepageController");
dotenv_1.default.config();
// Connect to MongoDB
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Trust proxy for secure cookies on Vercel/Heroku
app.set('trust proxy', 1);
// Manual CORS & Preflight Handling (More robust for Vercel/Proxy)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        process.env.FRONTEND_URI,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://sparkiit.vercel.app',
        'https://sparkiit-frontend.vercel.app',
        'https://sparkiit-website-frontend-git-main-sunirmal147-7225s-projects.vercel.app'
    ].filter(Boolean);
    if (origin && (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app') || origin.startsWith('http://192.168.'))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }
    next();
});
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
// Session Configuration
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'sparkiit_default_secret',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.SESSION_MONGODB_URI || process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));
// Middleware to clear homepage cache on write operations (POST, PUT, DELETE, PATCH)
app.use((req, res, next) => {
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        (0, homepageController_1.clearHomepageCache)();
    }
    next();
});
app.use('/api', api_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/public', publicRoutes_1.default);
// Static files (Certificates & Templates)
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
// ratelimmiter
app.get('/', (req, res) => {
    res.send('Edutech Backend Service is running!');
});
// Export for Vercel serverless functions
exports.default = app;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('--- Environment Config ---');
    console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('FRONTEND_URI:', process.env.FRONTEND_URI || 'Not Set');
    console.log('--------------------------');
});
