import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service';

dotenv.config();

const dump = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Connected to MongoDB');
        const services = await Service.find().sort({ order: 1 });
        console.log('SERVICES IN DB:', JSON.stringify(services, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

dump();
