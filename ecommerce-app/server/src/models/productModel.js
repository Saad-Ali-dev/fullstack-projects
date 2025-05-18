import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  percentage: { type: Number, default: 0 },
});

const ratingsSchema = new mongoose.Schema(
  {
    avg: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    // Indexing 'category' for efficient querying by category.
    category: { type: [String], required: true, index: true },
    images: { type: [String], required: true },
    brand: { type: String, required: true, trim: true },
    // Using mongoose.Schema.Types.Mixed for attributes as its structure can vary.
    attributes: { type: mongoose.Schema.Types.Mixed },
    stock: { type: Number, required: true, min: 0 },
    ratings: { type: ratingsSchema, default: () => ({ avg: 0, count: 0 }) },
    // Your custom 'id' field. Indexed for fast lookups and unique.
    id: { type: Number, required: true, unique: true, index: true },
    sales: { type: Number, default: 0 },
    keywords: { type: [String] },
    offer: {
      type: offerSchema,
      default: () => ({ status: false, percentage: 0 }),
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
