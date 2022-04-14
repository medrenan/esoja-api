import { HttpException, HttpStatus } from '@nestjs/common';

export function Ok(data?: any) {
  data = dataTransform(data, 'Ok');

  throw new HttpException(data, HttpStatus.OK);
}

export function Created(data?: any) {
  data = dataTransform(data, 'Created');

  throw new HttpException(data, HttpStatus.CREATED);
}

export function Accepted(data?: any) {
  data = dataTransform(data, 'Accepted');

  throw new HttpException(data, HttpStatus.ACCEPTED);
}

function dataTransform(data, message: string) {
  if (typeof data === 'string') return { message: data };
  else if (!data) return { message: message };
  else return data;
}
