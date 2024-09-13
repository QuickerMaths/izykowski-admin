import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import { Image } from './entities/Image.ts';

const PORT = 3000;

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});

const start = async () => {
    const app = express();
    await mongoose.connect('mongodb+srv://QucikerMaths:8Zol1rrU5OLzdDqK@cluster0.uely4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    const adminOptions = {
        resources: [Image],
    }
    const admin = new AdminJS(adminOptions);

    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.get('/', (req, res) => {
        return res.send('ok')
    });

    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(
            `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
        );
    });
};

start();
