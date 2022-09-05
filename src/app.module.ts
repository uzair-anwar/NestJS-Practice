import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/Products.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://uzairanwar:Uzair6702@cluster0.zqp92wv.mongodb.net/test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
