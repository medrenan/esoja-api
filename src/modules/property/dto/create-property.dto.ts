import { IsZipcode } from '@src/utils/decorators/is.zipcode.decorator';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  city: string;
  state: string;
  ibgeCode: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude: string;

  @IsLongitude()
  @IsNotEmpty()
  longitude: string;
}
