import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Image from './entities/Image.js';
import Appointment from './entities/Appointment.js';
import { componentLoader } from './components/componentsLoader.js';
import uploadFeature from '@adminjs/upload';

dotenv.config();

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});

const AWScredentials = {
    credentails: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_DEFAULT_REGION as string,
    bucket: process.env.AWS_BUCKET as string,
    expires: 0,
};

const adminOptions = {
    rootPath: '/',
    componentLoader,
    resources: [
        {
            resource: Image,
            options: {
                properties: {
                    s3Key: {
                        isVisible: false,
                    },
                    bucket: {
                        isVisible: false,
                    },
                    mime: {
                        isVisible: false,
                    },
                },
                navigation: {
                    name: 'Galeria',
                },
            },
            features: [
                uploadFeature({
                    componentLoader,
                    properties: {
                        file: 'file',
                        key: 's3Key',
                        bucket: 'bucket',
                        mimeType: 'mime',
                    },
                    provider: { aws: AWScredentials },
                    // provider: { local: localProvider },
                    uploadPath: (record, filename) => {
                        // Customize the path as needed
                        return `https://izykowski-bucket.s3.amazonaws.com//${filename}`;
                    },
                    validation: { mimeTypes: ['image/jpeg', 'image/png'] },
                }),
            ],
        },
        {
            resource: Appointment,
            options: {
                navigation: {
                    name: 'Kalendarz',
                },
            },
        },
    ],
};

const app = express();

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);

        const admin = new AdminJS(adminOptions);
        const adminRouter = AdminJSExpress.buildRouter(admin);

        app.use(express.json());

        app.use(cors());

        app.use(admin.options.rootPath, adminRouter);

        app.listen(3000, () =>
            console.log('App is running on http://localhost:3000')
        );

        admin.watch();
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

start();
