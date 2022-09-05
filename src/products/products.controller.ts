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
    const generatedId = this.productsService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
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
    this.productsService.updateProduct(
      productId,
      productTitle,
      productDesc,
      productPrice,
    );
  }

  @Delete(':id')
  deteleProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
  }
}
