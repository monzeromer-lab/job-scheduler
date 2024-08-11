import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { parseExpression } from 'cron-parser';

@ValidatorConstraint({ async: false })
export class IsCronExpressionConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    try {
      const result = parseExpression(value);
      // If the expression is parsed successfully, it's valid
      return typeof value === 'string' && !!result.fields.second;
    } catch (error) {
      // If an error is thrown, the cron expression is invalid
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid cron expression';
  }
}

export function IsCronExpression(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCronExpressionConstraint,
    });
  };
}

