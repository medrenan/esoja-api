import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { ProductivityService } from '../cultive/productivity/productivity.service';

@Module({
  controllers: [SampleController],
  providers: [SampleService, ProductivityService],
})
export class SampleModule {}
