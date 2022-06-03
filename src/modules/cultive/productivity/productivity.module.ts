import { Module } from '@nestjs/common';
import { ProductivityController } from './productivity.controller';
import { ProductivityService } from './productivity.service';

@Module({
  controllers: [ProductivityController],
  providers: [ProductivityService],
})
export class ProductivityModule {}
