import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  type: String,
  volume: String,
  filter_hairType: String,
  filter_problem: String,
  description: String,
  howToUse: String,
  benefits: [String],
});

const Product = mongoose.model('Product', productSchema);
export default Product;
