import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

export const regex = /^[0-9]{4}-[0-9]{4}$/;

export function IsCropYear(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCropYearConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsCropYear', async: true })
export class IsCropYearConstraint implements ValidatorConstraintInterface {
  async validate(cropYear: string): Promise<boolean> {
    return cropYear ? regex.test(cropYear) : false;
  }

  defaultMessage(): string {
    return 'Invalid crop year, format required: 2020-2021';
  }
}
