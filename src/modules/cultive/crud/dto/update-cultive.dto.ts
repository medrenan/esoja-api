import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCultiveDto } from './create-cultive.dto';

export class UpdateCultiveDto extends PartialType(
  OmitType(CreateCultiveDto, ['propertyId', 'plantsPerMeter', 'metersBetweenPlants', 'cultiveCoordinates', 'areaTotal', 'photo']),
) {}
