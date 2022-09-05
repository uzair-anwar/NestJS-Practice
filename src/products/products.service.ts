import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './Product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newPeoduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const res = await newPeoduct.save();

    if (res) {
      return true;
    } else {
      return false;
    }
  }

  async getProduct() {
    const result = await this.productModel.find().exec();
    return result.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  async getOneProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    prodId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const product = await this.findProduct(prodId);
    if (title) {
      product.title = title;
    }
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    const res = await product.save();
    if (res) return true;
    else return false;
  }

  async deleteProduct(prodId: string) {
    const { deletedCount } = await this.productModel
      .deleteOne({ _id: prodId })
      .exec();
    if (deletedCount === 0) {
      return false;
    } else {
      return true;
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not found product');
    }
    if (!product) {
      throw new NotFoundException('Could not found product');
    }
    return product;
  }
}
