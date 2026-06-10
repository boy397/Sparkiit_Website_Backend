import mongoose, { Schema, Document } from 'mongoose';

export interface ICollaborator extends Document {
    name: string;
    logoUrl?: string;
    link?: string;
    order?: number;
}

const CollaboratorSchema: Schema = new Schema({
    name: { type: String, required: true },
    logoUrl: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.models.Collaborator || mongoose.model<ICollaborator>('Collaborator', CollaboratorSchema);
