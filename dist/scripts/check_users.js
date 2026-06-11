"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const check = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const users = await User_1.default.find();
        console.log(`Total users: ${users.length}`);
        users.forEach(u => {
            console.log(`- Username: "${u.username}", Email: "${u.email}", Role: "${u.role}"`);
        });
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
check();
