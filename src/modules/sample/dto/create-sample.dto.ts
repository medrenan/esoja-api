import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateSampleDto {
  @IsUUID()
  @IsNotEmpty()
  cultiveId: string;

  @ArrayMaxSize(3)
  @ArrayMinSize(3)
  @IsArray()
  @Type(() => SampleDto)
  @ValidateNested({ each: true })
  samples: SampleDto[];
}

class SampleDto {
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
