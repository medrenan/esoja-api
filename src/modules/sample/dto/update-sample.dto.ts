import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSampleDto } from './create-sample.dto';

export class UpdateSampleDto extends PartialType(OmitType(CreateSampleDto, ['cultiveId'])) {}
