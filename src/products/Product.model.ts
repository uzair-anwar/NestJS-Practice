<<<<<<< HEAD
=======

>>>>>>> 088ab35a1229e11674f513e99b66ec5fa2e88f79
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
<<<<<<< HEAD
=======

>>>>>>> 088ab35a1229e11674f513e99b66ec5fa2e88f79
}
