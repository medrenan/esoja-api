import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

export const regex = /^[0-9]{5}-[0-9]{3}$/;

export function IsZipcode(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsZipcodeConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsZipcode', async: true })
export class IsZipcodeConstraint implements ValidatorConstraintInterface {
  async validate(zipcode: string): Promise<boolean> {
    return zipcode ? regex.test(zipcode) : false;
  }

  defaultMessage(): string {
    return 'Invalid zipcode, format required: XXXXX-XXX';
  }
}
