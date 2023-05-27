import axios from 'axios';
import config from 'config';

const ApiClient = axios.create({
    baseURL: config.apiUrl
});

export default ApiClient;
