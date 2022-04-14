import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

export function GreaterThan(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: GreaterThanConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'GreaterThan' })
export class GreaterThanConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return value > args.object[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} must be greater than ${args.property}`;
  }
}
