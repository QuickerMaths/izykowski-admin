import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';

const PORT = 3000;

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});

const start = async () => {
    await mongoose.connect(process.env.DB_URI!);
    const app = express();

    const admin = new AdminJS({});

    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(
            `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
        );
    });
};

start();
