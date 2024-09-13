import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import { Image } from './entities/Image.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});
const start = async () => {
    const app = express();
    await mongoose.connect(process.env.DB_URI as string);
    const adminOptions = {
        resources: [Image],
    };
    const admin = new AdminJS(adminOptions);
    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);
    app.get('/', (req, res) => res.send('Express on Vercel'));
    app.listen(PORT, () => {
        console.log('http://localhost:3000');
    });
};
start();
