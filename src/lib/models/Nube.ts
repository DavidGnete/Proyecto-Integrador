/* import mongoose, {Document, Model} from "mongoose";


export interface INube extends Document {
  name: string;
  price: string;
  image_url: string;
  public_id: string;
  city: string;
  country: string;
  description: string;
  gallery?: { public_id: string; url: string }[];
}

const ProductSchema = new mongoose.Schema<INube>({
  name: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  image_url: { type: String, required: true, trim: true },
  public_id: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  gallery: [
    {
      public_id: { type: String, trim: true },
      url: { type: String, trim: true },
    },
  ],
 
}, {

  timestamps: { createdAt: "createdAt", updatedAt: false },
  // explicitly use the existing MongoDB collection named 'Product'
  collection: 'Nube' /* ADDED */



/* export const Nube: Model<INube> = mongoose.models.Nube || mongoose.model<INube>("Nube", ProductSchema);
 */ 