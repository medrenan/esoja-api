import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';

export default function defaultPlainToClass<T, V>(cls: ClassConstructor<T>, plain: V, options?: ClassTransformOptions): T {
  return plainToClass(cls, plain, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
    enableImplicitConversion: true,
    groups: ['default'],
    ...options,
  });
}
