import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://staging.lifetivation.com/api',
});

export default instance;
