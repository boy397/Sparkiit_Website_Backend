import mongoose, { Schema, Document } from 'mongoose';

export interface IHorizontalScrollItem extends Document {
    title: string;
    description: string;
    category: string;
    image: string;
    num: string;
    link?: string;
    order: number;
}

const HorizontalScrollItemSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "GENERAL" },
    image: { type: String, default: "" },
    num: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.models.HorizontalScrollItem || mongoose.model<IHorizontalScrollItem>('HorizontalScrollItem', HorizontalScrollItemSchema);
