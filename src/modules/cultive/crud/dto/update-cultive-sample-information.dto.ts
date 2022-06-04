import { IsInt, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class UpdateCultiveSampleInformationDto {
  @IsInt()
  @IsNotEmpty()
  plantsPerMeter: number;

  @IsNumber()
  @IsNotEmpty()
  metersBetweenPlants: number;

  @IsUrl()
  @IsNotEmpty()
  photo: string;
}
