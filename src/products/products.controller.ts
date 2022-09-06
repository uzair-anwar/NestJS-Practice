import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ): any {
    const res = this.productsService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
    if (res) return { status: 200 };
    else {
      return { ststus: 400 };
    }
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProduct();
    if (products.length > 0) return { ststus: 200, result: products };
    else {
      return { status: 400, msg: 'No product found' };
    }
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    const product = await this.productsService.getOneProduct(id);
    if (product) {
      return { status: 200, result: product };
    } else {
      return { status: 400, message: 'Product an not find' };
    }
  }

  @Patch(':id')
  async updateProduct(
=======
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProduct();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.productsService.getOneProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    const result = await this.productsService.updateProduct(
      productId,
      productTitle,
      productDesc,
      productPrice,
    );
    if (result) {
      return { status: 200, message: 'Successfully updated' };
    } else {
      return { status: 400, message: 'Product an not find' };
    }
  }

  @Delete(':id')
  async deteleProduct(@Param('id') prodId: string) {
    const result = await this.productsService.deleteProduct(prodId);
    if (result) {
      return { status: 200, message: 'Successfully deleted' };
    } else {
      return { status: 400, message: 'Product an not find' };
    }
  }
}
