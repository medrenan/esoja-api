import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { CultiveModule } from './cultive/cultive.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [PropertyModule, CultiveModule, SampleModule],
  providers: [],
  exports: [],
})
export class ModulesModule {}
