import axios from 'axios';

const instance = axios.create({
  /*  baseURL: import.meta.env.VITE_BE_URL, */
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

export default instance;
