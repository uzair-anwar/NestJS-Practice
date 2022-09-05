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
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const res = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
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
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const result = await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
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
