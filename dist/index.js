import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Image } from './entities/Image.js';
dotenv.config();
AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});
const app = express();
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        const adminOptions = {
            resources: [Image],
        };
        const admin = new AdminJS(adminOptions);
        const adminRouter = AdminJSExpress.buildRouter(admin);
        app.use(express.json());
        app.use(cors());
        app.use(admin.options.rootPath, adminRouter);
        app.get('/', (_req, res) => res.status(200).send('Express on Vercel'));
    }
    catch (error) {
        console.error('Error starting the server:', error);
    }
};
start();
export default app;
