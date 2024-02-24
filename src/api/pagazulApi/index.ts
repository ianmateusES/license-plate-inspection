import axios from 'axios';

const pagazulApi = axios.create({
  baseURL: process.env.PAGAZUL_HOST,
  headers: {
    Authorization: process.env.PAGAZUL_AUTH,
  },
});

export { pagazulApi };
