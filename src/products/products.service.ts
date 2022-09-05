import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './Product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProduct() {
    return [...this.products];
  }

  getOneProduct(id: string) {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string): any {
    const index = this.findProduct(prodId)[1];
    if (index) {
      this.products.splice(index, 1);
      return true;
    } else {
      throw new NotFoundException('Item not found');
    }
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Can not find Product');
    } else {
      return [product, productIndex];
    }
  }
}
