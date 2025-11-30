import mongoose, {Document, Model} from "mongoose";


export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string; 
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, {
  timestamps: { createdAt: "createdAt", updatedAt: false }
});

// avoid model overwrite in dev
export const coworking: Model<IUser> = mongoose.models.coworking || mongoose.model<IUser>("coworking", UserSchema);