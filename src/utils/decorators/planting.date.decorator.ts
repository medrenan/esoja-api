import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

export const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export function IsPlantingDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPlantingDateConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsPlantingDate', async: true })
export class IsPlantingDateConstraint implements ValidatorConstraintInterface {
  async validate(plantingDate: string): Promise<boolean> {
    return plantingDate ? regex.test(plantingDate) : false;
  }

  defaultMessage(): string {
    return 'Invalid planting date, format required: YYYY-MM-DD';
  }
}
