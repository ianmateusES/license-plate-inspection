import axios from 'axios';

const ultimateAlprAPI = axios.create({
  baseURL: process.env.ULTIMATE_LPR_HOST,
});

export { ultimateAlprAPI };
