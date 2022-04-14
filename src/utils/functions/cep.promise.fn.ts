import { BadRequestException } from '@nestjs/common';
import { CEP } from 'cep-promise';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Cep = require('cep-promise');

export async function CepPromise(zipcode: string): Promise<CEP> {
  return Cep(zipcode)
    .then((res: CEP) => res)
    .catch(() => {
      throw new BadRequestException('Error on find your zipcode');
    });
}
