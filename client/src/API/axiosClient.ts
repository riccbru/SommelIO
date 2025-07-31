import axios from 'axios';
import config from './config';

const axiosClient = axios.create({
  baseURL: `http://${config.HOSTNAME}:${config.PORT}/api/v1`
});

export default axiosClient;