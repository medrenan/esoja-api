import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

@Injectable()
export class AgritechService {
  apiToken: string;
  apiUrl = `https://api.cnptia.embrapa.br/agritec/v1/`;
  apiConfig: AxiosRequestConfig = { headers: { accept: 'application/json', Authorization: `Bearer ${process.env.AGRITECH_TOKEN}` } };

  culturaAgritech = { id: 60, cultura: 'SOJA' };

  constructor() {
    setTimeout(async () => {
      await this.getCultivaresObtentor();
      await this.getCultivaresByObtentor();
    }, 2000);
  }

  async getToken() {
    const apiUrl = `https://api.cnptia.embrapa.br/token`;

    const data = {
      grant_type: {
        username: process.env.AGRITECH_USER,
        password: process.env.AGRITECH_PASS,
      },
    };
  }

  async getCultivaresObtentor() {
    const query = `?safra=2020-2021&uf=SP&idCultura=60`;

    const obtentor: string[] = [];

    const res: AgritechCultivaresI[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log(err.response);
      });

    res.forEach((value) => {
      if (!obtentor.includes(value.obtentorMantenedor)) obtentor.push(value.obtentorMantenedor);
    });

    console.log(obtentor);
  }

  async getCultivaresByObtentor() {
    const query = `?safra=2020-2021&uf=SP&idCultura=60&obtentorMantenedor=AGRO NORTE PESQUISA E`;

    const res: AgritechCultivaresI[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log(err.response);
      });

    res.filter((value) => value.obtentorMantenedor === 'AGRO NORTE PESQUISA E');

    console.log(res);
  }

  async getCultivaresData() {
    const query = `?safra=2020-2021&uf=SP&idCultura=60&obtentorMantenedor=AGRO NORTE PESQUISA E`;

    const res: AgritechCultivaresI[] = await axios
      .get(this.apiUrl + 'cultivares' + query, this.apiConfig)
      .then((res) => res.data.data)
      .catch((err: AxiosError) => {
        console.log(err.response);
      });

    res.filter((value) => value.obtentorMantenedor === 'AGRO NORTE PESQUISA E');

    console.log(res);
  }
}

interface AgritechCultivaresI {
  idCultivar: number;
  idCultura: number;
  safra: string;
  numeroRnc: string;
  obtentorMantenedor: string;
  cultivar: string;
  cultura: string;
  potencialProdutivo: number;
  duracaoCiclo: number;
  uf: string;
  grupo: string;
  maturacaoFisiologica: number;
  floracao: number;
  dataAtualizacao: string;
  regiao: string;
  grupoBioClimatico: string;
}
