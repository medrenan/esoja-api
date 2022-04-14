import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSampleDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  grainsPlant1: number;

  @IsNumber()
  @IsNotEmpty()
  grainsPlant2: number;
}
