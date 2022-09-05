import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/Products.module';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
