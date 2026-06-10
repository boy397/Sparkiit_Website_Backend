import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to MongoDB');

        const users = await User.find();
        console.log(`Total users: ${users.length}`);
        users.forEach(u => {
            console.log(`- Username: "${u.username}", Email: "${u.email}", Role: "${u.role}"`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

check();
