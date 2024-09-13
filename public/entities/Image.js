import { model, Schema } from 'mongoose';
export const CategorySchema = new Schema({
    url: { type: 'String', required: true },
}, { timestamps: true });
export const Image = model('Category', CategorySchema);
