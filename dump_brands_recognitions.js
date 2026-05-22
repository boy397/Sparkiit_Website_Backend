const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const schema = new mongoose.Schema({}, { strict: false });
const Brand = mongoose.model('Brand', schema, 'brands');
const Recognition = mongoose.model('Recognition', schema, 'recognitions');

async function dump() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        console.log('--- ALL BRANDS ---');
        const brands = await Brand.find({});
        console.log(JSON.stringify(brands, null, 2));

        console.log('--- ALL RECOGNITIONS ---');
        const recognitions = await Recognition.find({});
        console.log(JSON.stringify(recognitions, null, 2));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

dump();
