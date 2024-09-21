import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        s3Key: { type: String, required: false },
        file: { type: String, required: false },
        bucket: { type: String, required: false },
        mime: { type: String, required: false },
    },
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
);

const Image = mongoose.model('Zdjęcia', imageSchema);

export default Image;
