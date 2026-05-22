"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Service_1 = __importDefault(require("../models/Service"));
dotenv_1.default.config();
const dump = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const services = await Service_1.default.find().sort({ order: 1 });
        console.log('SERVICES IN DB:', JSON.stringify(services, null, 2));
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
dump();
