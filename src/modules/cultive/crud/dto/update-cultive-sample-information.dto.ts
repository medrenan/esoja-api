import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCultiveSampleInformationDto {
  @IsNumber()
  @IsNotEmpty()
  plantsPerMeter: number;

  @IsNumber()
  @IsNotEmpty()
  metersBetweenPlants: number;
}
