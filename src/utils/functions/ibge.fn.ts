import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

export async function getIbgeCode(state: string, city: string) {
  const apiUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`;

  const res: IbgeResponseI[] = await axios
    .get(apiUrl)
    .then((res) => res.data)
    .catch(() => {
      throw new BadRequestException('Error on find city IBGE Code');
    });

  const ibgeData = res.find((data) => data.nome === city);

  return ibgeData?.id;
}

interface IbgeResponseI {
  id: string;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: { id: number; nome: string; UF: any };
  };
  'regiao-imediata': {
    id: number;
    nome: string;
    'regiao-intermediaria': { id: number; nome: string; UF: any };
  };
}
