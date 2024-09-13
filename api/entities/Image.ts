import { model, Schema } from 'mongoose'

export interface IImage {
  url: string;
}

export const CategorySchema = new Schema<IImage>(
  {
    url: { type: 'String', required: true },
  },
  { timestamps: true },
)

export const Image = model<IImage>('Category', CategorySchema);
