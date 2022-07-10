import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://twitterclone.local/api', // Should be used in an .env fiel as well.
});

export default instance;
