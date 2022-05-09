import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import { CreateCultiveDto } from './create-cultive.dto';

export class UpdateCultiveDto extends PartialType(
  OmitType(CreateCultiveDto, ['propertyId', 'plantsPerMeter', 'metersBetweenPlants', 'cultiveCoordinates', 'areaTotal', 'photo']),
) {
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((data) => data.status)
  realProduction: number;
}
