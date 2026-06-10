import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import apiRoutes from './routes/api';
import adminRoutes from './routes/adminRoutes';
import publicRoutes from './routes/publicRoutes';
import path from 'path';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Trust proxy for secure cookies on Vercel/Heroku
app.set('trust proxy', 1);

// Manual CORS & Preflight Handling (More robust for Vercel/Proxy)
app.use((req: Request, res: Response, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        process.env.FRONTEND_URI,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://sparkiit.vercel.app',
        'https://sparkiit-frontend.vercel.app',
        'https://sparkiit-website-frontend-git-main-sunirmal147-7225s-projects.vercel.app'
    ].filter(Boolean);

    if (origin && (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app'))) {
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'sparkiit_default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
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

app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Static files (Certificates & Templates)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ratelimmiter

app.get('/', (req: Request, res: Response) => {
    res.send('Edutech Backend Service is running!');
});

// Export for Vercel serverless functions
export default app;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('--- Environment Config ---');
    console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
    console.log('FRONTEND_URI:', process.env.FRONTEND_URI || 'Not Set');
    console.log('--------------------------');
});
