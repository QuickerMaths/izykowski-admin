import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express, { Request, Response } from 'express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import { Image } from './entities/Image.js';
import dotenv from 'dotenv';

dotenv.config();

AdminJS.registerAdapter({
    Database: AdminJSMongoose.Database,
    Resource: AdminJSMongoose.Resource,
});

let cachedDb: typeof mongoose | null = null;

async function connectToDatabase(): Promise<typeof mongoose> {
    console.log(process.env.DB_URI);
    if (cachedDb) {
        return cachedDb;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    cachedDb = db;
    return db;
}

const app = express();

const adminOptions = {
    resources: [Image],
};

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(admin.options.rootPath, adminRouter);

app.get('/', (_req: Request, res: Response) => {
    res.send('API is running');
});

export default async function handler(req: Request, res: Response) {
    await connectToDatabase();
    return app(req, res);
}
