import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

@Injectable()
export class AgritechService {
  apiToken: string;

  culturaAgritech = { id: 60, cultura: 'SOJA' };

  constructor() {
    setTimeout(() => {
      // this.x();
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

  async getCultivares() {
    const apiUrl = `https://api.cnptia.embrapa.br/agritec/v1/cultivares`;

    const config: AxiosRequestConfig = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.AGRITECH_TOKEN}`,
      },
    };

    const res = await axios
      .get(apiUrl, config)
      .then((res) => res)
      .catch((err: AxiosError) => {
        console.log(err.response.status);
        console.log(err.response.statusText);
      });

    console.log(res);
  }
}
