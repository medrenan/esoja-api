import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { CultiveModule } from './cultive/cultive.module';
import { SampleModule } from './sample/sample.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PropertyModule, CultiveModule, SampleModule, UserModule],
  providers: [],
  exports: [],
})
export class ModulesModule {}
