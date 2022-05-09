import { enumCultiveStatus } from '@prisma/client';
import { Expose, Transform, Type, plainToClass } from 'class-transformer';
import { IsArray, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsUrl, ValidateNested } from 'class-validator';

export class CreateCultiveDto {
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => CultiveCoordinatesDto)
  @ValidateNested({ each: true })
  @Transform((data) => removeDuplicates(data.obj.cultiveCoordinates))
  cultiveCoordinates: CultiveCoordinatesDto[];

  @IsNumber()
  @IsNotEmpty()
  areaTotal: number;

  @IsNumber()
  @IsNotEmpty()
  plantsPerMeter: number;

  @IsNumber()
  @IsNotEmpty()
  metersBetweenPlants: number;

  @IsEnum(enumCultiveStatus)
  @IsNotEmpty()
  status: enumCultiveStatus;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  photo: string;

  expectedProduction: number;
  realProduction: number;
}

export class CultiveCoordinatesDto {
  @IsLatitude()
  @IsNotEmpty()
  @Expose()
  latitude: string;

  @IsLongitude()
  @IsNotEmpty()
  @Expose()
  longitude: string;
}

function removeDuplicates(data: CultiveCoordinatesDto[] = []) {
  const dataWithoutDuplicates: CultiveCoordinatesDto[] = [];

  data.forEach((item) => {
    const duplicated = dataWithoutDuplicates.findIndex((redItem: CultiveCoordinatesDto) => {
      return item.latitude === redItem.latitude && item.longitude === redItem.longitude;
    });

    if (duplicated === -1) dataWithoutDuplicates.push(plainToClass(CultiveCoordinatesDto, item));
  });

  return dataWithoutDuplicates;
}
