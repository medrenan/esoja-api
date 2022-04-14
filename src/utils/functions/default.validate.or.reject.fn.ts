import { HttpException, HttpStatus } from '@nestjs/common';
import { validateOrReject } from 'class-validator';

export default async function defaultValidateOrReject(data): Promise<void> {
  await validateOrReject(data).catch((errors) => {
    const errMessages = [];

    errors.forEach((err) => {
      Object.values(err.constraints).forEach((val) => errMessages.push(val));
    });

    throw new HttpException({ statusCode: 400, message: errMessages }, HttpStatus.BAD_REQUEST);
  });
}
