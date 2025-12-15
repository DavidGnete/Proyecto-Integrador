/* import mongoose, { Document, Model } from "mongoose";
import { Types } from "mongoose";

export interface IProductImage extends Document {
  productId: Types.ObjectId;
  public_id: string;
  url: string;
  createdAt: Date;
}

const ProductImageSchema = new mongoose.Schema<IProductImage>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Nube", required: true },
    public_id: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, collection: "ProductImage" }
);

export const ProductImage: Model<IProductImage> =
  mongoose.models.ProductImage || mongoose.model<IProductImage>("ProductImage", ProductImageSchema);

export default ProductImage;
 */