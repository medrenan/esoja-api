import { IsZipcode } from '@src/utils/decorators/is.zipcode.decorator';
import { IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreatePropertyDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsZipcode()
  @IsNotEmpty()
  zipcode: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  picture: string;

  city: string;
  state: string;
  ibgeCode: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude: number;
}
