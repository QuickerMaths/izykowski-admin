import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Image } from './entities/Image.js';

dotenv.config();

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});

const app = express();

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);

        const adminOptions = {
            resources: [Image],
        };
        const admin = new AdminJS(adminOptions);
        const adminRouter = AdminJSExpress.buildRouter(admin);

        app.use(admin.options.rootPath, adminRouter);

        app.get('/', (_req, res) => res.send('Express on Vercel'));

        app.listen(3000);
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

start();

export default app;

